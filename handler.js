'use strict';
const handler = require('serverless-express/handler');
const tweetClient = require('./modules/tweet-client');
const heartbeat = require('./modules/heartbeat');
const app = require('./app');
 
 
//exports.api = handler(app)
// that's it ;)

// module.exports.hello = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

exports.api = handler(app); 
exports.heartbeat = heartbeat.handler;
exports.tweetSearch = tweetClient.search