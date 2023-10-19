import {execSync} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {findJetpackRoot} from '../util';

const getPlugins = (rootPath: string) =>
    fs.readdirSync(path.join(rootPath, 'projects', 'plugins'), {withFileTypes: true})
        .filter(result => result.isDirectory())
        .map(result => result.name);

export const rsyncCommand = async () => {
    const jetpackRoot = findJetpackRoot();

    if (!jetpackRoot) {
        return;
    }

    const plugin = await vscode.window.showQuickPick(getPlugins(jetpackRoot), {
        placeHolder: "Which plugin would you like to sync?",
    });

	if (!plugin) {
		return;
	}

    const wpPath = await vscode.window.showInputBox({
        prompt: 'Enter the remote path to upload the plugin contents to.',
        placeHolder: 'user@server:public_html/wp-content/plugins/jetpack',
		ignoreFocusOut: true,
    });

	if (!wpPath) {
		return;
	}

    const confirmation = await vscode.window.showWarningMessage(
        `You're about to upload the contents of plugins/${plugin} to ${wpPath}. Do you want to proceed?`,
        'Yes',
        'No'
    );

    if (confirmation !== 'Yes') {
        return;
    }

	// If wpPath includes "jurassic.ninja" we need to open a terminal so the password can be entered.
	// Otherwise, we can just run the command in the background.
	if (wpPath.includes('jurassic.ninja')) {
		const terminal = vscode.window.createTerminal({
			name: 'Jetpack Rsync',
			cwd: jetpackRoot,
		});
		terminal.show();
		try {
			terminal.sendText(`pnpm jetpack rsync ${plugin} ${wpPath}`);
		} catch (error) {
			console.log(error);
		}
	} else {
		try {
			execSync(`pnpm jetpack rsync ${plugin} ${wpPath}`, {cwd: jetpackRoot});
		} catch (error) {
			console.log(error);
		}
	}
}
