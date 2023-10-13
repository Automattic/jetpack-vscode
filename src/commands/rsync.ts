import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {findJetpackRoot} from '../util';

const getPlugins = () => {
    const jetpackRoot = findJetpackRoot();

    if (!jetpackRoot) {
        return [];
    }

    return fs.readdirSync(path.join(jetpackRoot, 'projects', 'plugins'), {withFileTypes: true})
        .filter(result => result.isDirectory())
        .map(result => result.name);
};

export const rsyncCommand = async () => {
    const plugin = await vscode.window.showQuickPick(getPlugins(), {
        placeHolder: "Which plugin would you like to sync?",
    });
};
