import * as vscode from 'vscode';

export enum TaskType {
    WatchTask,
};

export interface Task {
    name: string;
    type: TaskType;
    terminal?: vscode.Terminal;
};

const activeTasks: Task[] = [];

export const addTask = (task: Task) =>
    activeTasks.push(task);

export const removeTask = (name: string) => {
    const index = activeTasks.findIndex((task) => task.name === name);

    if (index < 0) {
        return;
    }

    activeTasks.splice(index, 1);
};

export const getTasks = () => activeTasks;

export const getTasksByType = (type: TaskType) =>
    activeTasks.filter((task) => task.type === type);
