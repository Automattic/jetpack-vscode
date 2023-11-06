import * as vscode from 'vscode';
import { addTask, getTasks, getTasksByType, removeTask, TaskType, Task } from '../tasks';

let statusBar: vscode.StatusBarItem;

export const updateStatusBar = () => {
    const watchers = getTasksByType(TaskType.WatchTask);

    if (watchers.length === 0) {
        statusBar.hide();
        return;
    }

    statusBar.command = 'jetpack.watchProject.stop';
    statusBar.name = 'Jetpack status';
    statusBar.text = `$(heart-filled) ${watchers.length}`;
    statusBar.tooltip = 'Currently watching:\n' + watchers.map(({name}) => `- ${name}`).join('\n');

    statusBar.show();
};

export const activateStatusBar = ({ subscriptions }: vscode.ExtensionContext): void => {
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    subscriptions.push(statusBar);

    subscriptions.push(vscode.window.onDidCloseTerminal((closedTerminal: vscode.Terminal) => {
        const task = getTasks().find(({terminal}: Task) => terminal === closedTerminal);

        if (!task) {
            return;
        }

        removeTask(task.name);
        updateStatusBar();
    }));
};
