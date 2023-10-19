"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsyncCommand = void 0;
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const util_1 = require("../util");
const newSiteOption = '+ Add New Site';
const getPlugins = (rootPath) => fs.readdirSync(path.join(rootPath, 'projects', 'plugins'), { withFileTypes: true })
    .filter(result => result.isDirectory())
    .map(result => result.name);
const configFilePath = path.join(process.env.HOME || '', '.config', 'configstore', 'automattic', 'jetpack-cli', 'rsync.json');
// Return a list of saved sites from the client's configstore file at 'automattic/jetpack-cli/rsync' if available.
const getSavedSites = (configPath) => {
    try {
        const fileContents = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(fileContents);
        const keys = Object.keys(config);
        keys.unshift(newSiteOption);
        return keys;
    }
    catch {
        return [newSiteOption];
    }
};
// Return the path to the saved site's plugin
const getSavedPath = (site, configPath = configFilePath) => {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(fileContents);
    return config[site];
};
const rsyncCommand = async () => {
    const jetpackRoot = (0, util_1.findJetpackRoot)();
    if (!jetpackRoot) {
        return;
    }
    const plugin = await vscode.window.showQuickPick(getPlugins(jetpackRoot), {
        placeHolder: "Which plugin would you like to sync?",
    });
    if (!plugin) {
        return;
    }
    const existingSite = await vscode.window.showQuickPick(getSavedSites(configFilePath), {
        placeHolder: "Which site would you like to sync to?"
    });
    if (!existingSite) {
        console.log('No site selected, exiting.');
        return;
    }
    const wpPath = existingSite === newSiteOption
        ? await vscode.window.showInputBox({
            prompt: 'Enter the remote path to upload the plugin contents to.',
            placeHolder: 'user@server:public_html/wp-content/plugins/jetpack',
            ignoreFocusOut: true,
        })
        : getSavedPath(existingSite);
    if (!wpPath) {
        console.log('No path valid selected, exiting.');
        return;
    }
    const confirmation = await vscode.window.showWarningMessage(`You're about to upload the contents of plugins/${plugin} to ${wpPath}. Do you want to proceed?`, 'Yes', 'No');
    if (confirmation !== 'Yes') {
        return;
    }
    const terminal = vscode.window.createTerminal({
        name: 'Jetpack Rsync',
        cwd: jetpackRoot,
    });
    // Show the terminal if connecting to a Jurassic.ninja site so that the user can enter their password.
    if (wpPath.includes('jurassic.ninja')) {
        terminal.show();
    }
    try {
        terminal.sendText(`pnpm jetpack rsync ${plugin} ${wpPath}`);
    }
    catch (error) {
        terminal.show();
        console.log(error);
    }
};
exports.rsyncCommand = rsyncCommand;
//# sourceMappingURL=rsync.js.map