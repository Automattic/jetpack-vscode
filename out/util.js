"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJetpackRoot = void 0;
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const isJetpackRoot = (folderPath) => {
    if (!folderPath) {
        return false;
    }
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(folderPath, 'package.json'), 'utf8'));
        return packageJson && packageJson.name === '@automattic/Jetpack_Monorepo';
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
const findGitRoot = (uri) => (0, child_process_1.execSync)('git rev-parse --show-toplevel', { cwd: uri.fsPath }).toString().trim();
const findJetpackRoot = () => {
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
exports.findJetpackRoot = findJetpackRoot;
//# sourceMappingURL=util.js.map