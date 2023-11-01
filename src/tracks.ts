/**
 * Configures and executes the Track event using the following call:
 * 
 * curl 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1' -H 'Accept-Encoding: gzip, deflate' -H 'User-Agent: cURL, baby!' -H 'Content-Type: application/json' -H 'Accept: application/json' --data '{"commonProps": {"_ul": "myname"}, "events": [{"_en": "wpcom_test_test"}]}' --compressed
 */

import fetch from 'node-fetch';

export function callTrackEvent() {
	const url = 'https://public-api.wordpress.com/rest/v1.1/tracks/record?http_envelope=1';
	const headers = {
		'Accept-Encoding': 'gzip, deflate',
		'User-Agent': 'Jetpack VSCode Extension',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
	const body = {
		commonProps: { _ul: 'myname' },
		events: [{ _en: 'wpcom_test_test' }]
	};

	fetch(url, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));
}