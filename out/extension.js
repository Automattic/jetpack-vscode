"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const rsync_1 = require("./commands/rsync");
const util_1 = require("./util");
function activate(context) {
    const jetpackRoot = (0, util_1.findJetpackRoot)();
    if (!jetpackRoot) {
        vscode.window.showErrorMessage("Jetpack monorepo not found within the current workspace.");
        return;
    }
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "jetpack" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('jetpack.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Jetpack!');
    });
    let rsync = vscode.commands.registerCommand('jetpack.rsync', rsync_1.rsyncCommand);
    context.subscriptions.push(disposable);
    context.subscriptions.push(rsync);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map