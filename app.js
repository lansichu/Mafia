var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient


app.get('/login', function (req, res) {
 
	MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
      if (err) throw err


      if(req.query.name){

        db.collection('Players').find({_id: req.query.name}).toArray(function (err, result) {
           if (err) throw err

           if(result.length == 0){
              db.collection('Players').insert(
               {
                 _id: req.query.name,
                 name: req.query.name,
                 role: null,
                 alive: true
               }
              );
            res.send(
				{success: true,
				message: "Success! Player added"}
			);
            
           }else{
              res.send(
				  {success: false,
				  message: "Name already exists. Please choose another name"}
			  );
           }
        })

      }else{
        res.send(
			{success: false,
				message: "Error. Something went wrong with the query parameters!"}
		);
      }
})


})

app.listen(3001, function () {
  console.log('Master service activated...')
})

var express = require("express");
	app = express();

app.all("/api/*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	return next();
});



