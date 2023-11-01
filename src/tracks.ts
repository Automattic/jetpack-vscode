/**
 * Configures and executes the Track event using the following call:
 * 
 * curl 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1' -H 'Accept-Encoding: gzip, deflate' -H 'User-Agent: cURL, baby!' -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"commonProps": {"_ul": "myname"}, "events": [{"_en": "wpcom_test_test"}]}' --compressed
 */
import { exec } from 'child_process';

export function callTrackEvent() {
	console.log("I am here in the function");
	const url = 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1';
	const headers = {
		'Accept-Encoding': 'gzip, deflate',
		'User-Agent': 'Jetpack VSCode Extension',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
	const body = {
		commonProps: { _ul: 'jetpacktest' },
		events: [{ _en: 'wpcom_test_test' }]
	};

	const command = `curl '${url}' -H 'Accept-Encoding: gzip, deflate' -H 'User-Agent: cURL, baby!' -H 'Content-Type: application/json' -H 'Accept: application/json' --data '${body}' --compressed`;
	//const command = `curl 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1' -H 'Accept-Encoding: gzip, deflate' -H 'User-Agent: Jetpack Test!' -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"commonProps": {"_ul": "myname"}, "events": [{"_en": "wpcom_test_test"}]}' --compressed`;
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