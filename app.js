var express = require('express')
var app = express()
var db
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
            res.send("Success! Player added");
            
           }else{
              res.send("Name already exists. Please choose another name");
           }
        })

      }else{
        res.send("Error. Something went wrong with the query parameters!");
      }
})


})

app.listen(3001, function () {
  console.log('Master service activated...')
})



