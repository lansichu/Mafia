var express = require('express')
var app = express()

app.get('/login', function (req, res) {
 

 res.send("Try to save name: " + req.query.name);



// var MongoClient = require('mongodb').MongoClient
// 	MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
//   		if (err) throw err
//   		db.collection('Game').find({'_id':'MafiaGame'}).toArray(function (err, result) {
//     			if (err) throw err

//     			console.log(result)
//   			res.send(result)

//   })
// })


})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



