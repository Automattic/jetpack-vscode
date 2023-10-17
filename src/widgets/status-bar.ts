import * as vscode from 'vscode';
import { addTask, getTasks, getTasksByType, removeTask, TaskType, Task } from '../tasks';

export const updateStatusBar = () => {
    const watchers = getTasksByType(TaskType.WatchTask);

    vscode.window.setStatusBarMessage(`Jetpack ${watchers.length}`);
};

export const activateStatusBar = ({ subscriptions }: vscode.ExtensionContext): void => {
    subscriptions.push(vscode.window.onDidCloseTerminal((closedTerminal: vscode.Terminal) => {
        const task = getTasks().find(({terminal}: Task) => terminal === closedTerminal);

        if (!task) {
            return;
        }

        removeTask(task.name);
        updateStatusBar();
    }));
};
