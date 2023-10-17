import {execSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {findJetpackRoot} from '../util';
import { addTask, getTasksByType, removeTask, TaskType } from '../tasks';
import { updateStatusBar } from '../widgets/status-bar';

const PROJECT_TYPES = [ 'github-actions', 'js-packages', 'packages', 'plugins' ];

const getProjectsByType = (type: string, rootPath: string) =>
    fs.readdirSync(path.join(rootPath, 'projects', type), {withFileTypes: true})
        .filter(result => result.isDirectory())
        .map(result => ({ label: result.name}));


export const watchProjectCommand = async () => {
    const jetpackRoot = findJetpackRoot();

    if (!jetpackRoot) {
        return;
    }

    const projectType = await vscode.window.showQuickPick(PROJECT_TYPES.map((label) => ({label})), {
        placeHolder: 'What project type are you working on?',
    });

    if (!projectType) {
        return;
    }

    const project = await vscode.window.showQuickPick(getProjectsByType(projectType.label, jetpackRoot), {
        placeHolder: 'Which project?',
    });

    if (!project) {
        return;
    }

    const terminal = vscode.window.createTerminal({ cwd: jetpackRoot, name: `jetpack watch ${projectType.label}/${project.label}` });
    terminal.sendText(`pnpm jetpack watch ${projectType.label}/${project.label}`);

    const task = {
        name: `${projectType.label}/${project.label}`,
        type: TaskType.WatchTask,
        terminal,
    };

    addTask(task);
    updateStatusBar();
};

export const stopWatchingProjectCommand = async () => {
    const activeWatchers = getTasksByType(TaskType.WatchTask);

    if (!activeWatchers) {
        return;
    }

    const taskName = await vscode.window.showQuickPick(
        activeWatchers.map(({name}) => ({label: name})),
        {placeHolder: 'Which task do you want to stop?'}
    );

    if (!taskName) {
        return;
    }

    const index = activeWatchers.findIndex((task) => task.name === taskName.label);

    if (index < 0) {
        return;
    }

    const task = activeWatchers[index];
    if (task.terminal) {
        task.terminal.dispose();
    }
    removeTask(taskName.label);
    updateStatusBar();
};
