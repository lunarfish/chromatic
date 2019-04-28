const express = require('serverless-express/express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.get('/mongo', async function(req, res, next) {

	let insertResult = {};
	
	const MongoClient = require('mongodb').MongoClient;
	 
	// Connection URL
	const url = 'mongodb://localhost:27017';
	 
	// Database Name
	const dbName = 'cities';
	 
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, client) {
	  console.log("Connected successfully to server");
	 
	  const db = client.db(dbName);

	  const collection = db.collection('test');
	  // Find some documents
	  collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs)
	    callback(docs);
	  });
	 
	  client.close();
	});

 	res.send(insertResult);
 

});
*/

module.exports = router;
