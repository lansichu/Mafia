var express = require('express')
var app = express()
var db
var MongoClient = require('mongodb').MongoClient


app.get('/login', function (req, res) {
 
	MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
  		if (err) throw err

  		db.collection('Players').insert(
		   {
		     name: req.query.name,
		     role: null,
		     alive: true
		   }
		);

res.send("Saved new Player "+req.query.name);



  // 		db.collection('Game').find({'_id':'MafiaGame'}).toArray(function (err, result) {
  //   			if (err) throw err

  //   			console.log(result)
  // 			res.send(result)

  // })
})


})

app.listen(3000, function () {
  console.log('Master service activated...')
})



