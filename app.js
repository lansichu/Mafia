var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 8080;

app.use(express.static('App'));

app.get('/', function (req, res) {
    res.sendfile('./App/mafiaApplication.html');
});

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
          res.send({success: true, message: "Success! Player added!"});
         }else{
            res.send({success: false, message: "Name already exists. Please choose another name"});
         }
      })
    }else{
      res.send({success: false, message: "Error. Something went wrong with the query parameters!"});
    }
  })
})

app.get('/lobby', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Players').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result);
    })
  })
})

app.get('/startGame', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Game').update(
      {
         _id: 0
      },
      {
         _id: 0,
         name: "Mafia",
         started: true,
         round: 1
      }, {}, function (err, result) {
      if (err) throw err

      res.send(result);
    })
  })
})

app.get('/isGameStarted', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Game').find({_id: 0}).toArray(function (err, result) {
      if (err) throw err

      res.send(result);
    })
  })
})

app.get('/finishGame', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Game').update(
      {
         _id: 0
      },
      {
         _id: 0,
         name: "Mafia",
         started: false,
         round: 1
      }, {}, function (err, result) {
      if (err) throw err

      res.send(result);
    })
  })
})

app.get('/leaveLobby', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

   if(req.query.name){
      db.collection('Players').remove({_id: req.query.name}, {}, function (err, result) {
        if (err) throw err

        res.send(result);
    });
    }
  })
})


app.listen(port, function () {
  console.log('Our app is running on Port ' + port);
})