"use strict";

exports.handler = async (event, context, callback) => {

	let now = new Date();
	let timestamp = now.toLocaleString({hour12:false});
	let message = 'heartbeat at ' + timestamp;
	console.log(message);
	callback(null);
}