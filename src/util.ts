import {execSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const isJetpackRoot = (folderPath: string) => {
    if (!folderPath) {
        return false;
    }

    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(folderPath, 'package.json'), 'utf8'));

        return packageJson && packageJson.name === '@automattic/Jetpack_Monorepo';
    } catch (error) {
        console.log(error);
        return false;
    }
};

const findGitRoot = (uri: vscode.Uri) =>
    execSync('git rev-parse --show-toplevel', {cwd: uri.fsPath}).toString().trim();

export const findJetpackRoot = () => {
    const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!gitExtension || !workspaceFolders) {
        return null;
    }

    for (const folder of workspaceFolders) {
        const gitRootPath = findGitRoot(folder.uri);

        if (isJetpackRoot(gitRootPath)) {
            return gitRootPath;
        }
    }

    return null;
};
