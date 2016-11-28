var express = require('express');
var http = require('http').Server(app);
var app = express();
var MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

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
});

app.get('/myRole', function (req, res) {
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Players').find({_id: req.query.name}).toArray(function (err, result) {
      if (err) throw err
        res.send(result);  
    })
  })
});

app.get('/lobby', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Players').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result);
    })
  })
});

app.get('/startGame', function(req, res){
  MongoClient.connect('mongodb://connection:connection@ds147777.mlab.com:47777/mafiadb', function (err, db) {
    if (err) throw err

    db.collection('Players').find().toArray(function (err, result) {
        if (err) throw err

        //Initialize with Villagers
        var i = 0;
        for(i=0; i<result.length; i++){
          console.log("set role for " +result[i]._id);
          db.collection('Players').update(
            {
               _id: result[i]._id
            },
            {
               _id: result[i]._id,
               name: result[i].name,
               role: "Villager",
               alive: true
            }, {}, function (err, result) {})
        }

        var mafia = [];
        for(i=0; i<(result.length/3); i++){
          var tmp_item = result[Math.floor(Math.random()*result.length)];
          if(mafia.indexOf(tmp_item)==-1){
            mafia.push(tmp_item);
            db.collection('Players').update(
              {
                 _id: tmp_item._id
              },
              {
                 _id: tmp_item._id,
                 name: tmp_item.name,
                 role: "Mafia",
                 alive: true
              }, {}, function (err, result) {})
          }else{
            i--;
          }
        }

       res.send(mafia);
    })
  })

  //Update Game to started = true
  //   db.collection('Game').update(
  //     {
  //        _id: 0
  //     },
  //     {
  //        _id: 0,
  //        name: "Mafia",
  //        started: true,
  //        round: 1
  //     }, {}, function (err, result) {
  //     if (err) throw err

  //     res.send(result);
  //   })
  // })
});

app.get('/reset', function(req, res){
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

        db.collection('Players').remove({}, {}, function (err, result) {
          if (err) throw err

          res.send({resetMessage: "Game got reset"});
      })
    })
})
});

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
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('player', function (username) {
        console.log('player ' + username);
        io.emit('new player', username);
    });

    socket.on('start game', function () {
        io.emit('game started', null);
    });
});


server.listen(port, function () {
  console.log('Our app is running on Port ' + port);
});