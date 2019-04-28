"use strict";

const Twitter = require('twitter');

const TweetLoader = {
	setup: () => {
		this.client = new Twitter({
		  consumer_key: process.env.TW1,
		  consumer_secret: process.env.TW2,
		  bearer_token: process.env.TW4
		});
	},
	search: async (options) => {
		return this.client.get('search/tweets', options)
		.then(async function(response) {
			let tweets = response.statuses;
	   	console.log("count", tweets.length);
	   	return tweets;
		});
	}
} 

exports.search = async (event, context, callback) => {
	try {
		TweetLoader.setup();
		let tweets = await TweetLoader.search({q: 'sheffield'});
		console.log("tweets", tweets);
	} catch(err) {
		console.log("error", err);
	}
	callback(null);
}