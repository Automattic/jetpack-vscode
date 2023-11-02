import * as vscode from 'vscode';

import {rsyncCommand} from './commands/rsync';
import {findJetpackRoot} from './util';

export function activate(context: vscode.ExtensionContext) {
	const jetpackRoot = findJetpackRoot();

	if (!jetpackRoot) {
		vscode.window.showErrorMessage("Jetpack monorepo not found within the current workspace.");
		return;
	}

	let rsync = vscode.commands.registerCommand('jetpack.rsync', rsyncCommand);

	context.subscriptions.push(rsync);
}

// This method is called when your extension is deactivated
export function deactivate() {}
