import * as vscode from 'vscode';

import {rsyncCommand} from './commands/rsync';
import { watchProjectCommand, stopWatchingProjectCommand } from './commands/watch';
import { activateStatusBar } from './widgets/status-bar';
import {findJetpackRoot} from './util';

export function activate(context: vscode.ExtensionContext) {
	const jetpackRoot = findJetpackRoot();

	if (!jetpackRoot) {
		vscode.window.showErrorMessage("Jetpack monorepo not found within the current workspace.");
		return;
	}

	let rsync = vscode.commands.registerCommand('jetpack.rsync', rsyncCommand);
	let watchproject = vscode.commands.registerCommand('jetpack.watchProject', watchProjectCommand);
	let stopWatchingProject = vscode.commands.registerCommand('jetpack.watchProject.stop', stopWatchingProjectCommand);

	context.subscriptions.push(rsync);
	context.subscriptions.push(watchproject);
	context.subscriptions.push(stopWatchingProject);

	activateStatusBar(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
