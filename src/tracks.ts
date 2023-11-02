/**
 * Configures and executes the Track event using the following call:
 * 
 * curl 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1' -H 'Accept-Encoding: gzip, deflate' -H 'User-Agent: cURL, baby!' -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"commonProps": {"_ul": "myname"}, "events": [{"_en": "wpcom_test_test"}]}' --compressed
 */
import * as vscode from 'vscode';
import { exec } from 'child_process';


export function callTrackEvent( eventName: string ) {

	// If analytic tracking is disabled, bail.
	const config = vscode.workspace.getConfiguration('jetpackVSCode');
	const enableAnalytics = config.get('enableAnalytics');
	if (!enableAnalytics) {
		return;
	}

	const url = 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1';
	const headers = {
		'Accept-Encoding': 'gzip, deflate',
		'User-Agent': 'Jetpack VSCode Extension',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
	const body = {
		commonProps: { _ul: 'jetpackisbestpack' },
		events: [{ _en: eventName }]
	};

	const headersString = Object.entries(headers)
		.map(([key, value]) => `-H '${key}: ${value}'`)
		.join(' ');

	const bodyString = JSON.stringify(body);

	const command = `curl '${url}' ${headersString} --data '${bodyString}' --compressed`;

	exec(command, (error, stdout, stderr) => {
	  if (error) {
		console.error(`Error: ${error.message}`);
		return;
	  }
	
	  if (stderr) {
		console.error(`Stderr: ${stderr}`);
		return;
	  }
	  console.log(`Stdout: ${stdout}`);
	});
}