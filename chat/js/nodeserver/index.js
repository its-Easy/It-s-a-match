const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users={};
const contacts={};

// mongo 
var MongoClient = require('mongodb').MongoClient;


function createdb(name){
  let url = `mongodb://localhost:27017/${name}`;

  MongoClient.connect(url, function(err, db) {
  // if (err) throw err;
  console.log("Database created!");
  db.close();
});
}


function createcollection(dbname,collectionname){
  let url = `mongodb://localhost:27017/${dbname}`;
  MongoClient.connect(url, function(err, db) {
    // if (err) throw err;
    var dbo = db.db(`${dbname}`);
    dbo.createCollection(`${collectionname}`, function(err, res) {
      // if (err) throw err;
      console.log(`Collection named ${collectionname} created!`);
      db.close();
    });
  });
}


io.on('connection',socket=>{
     socket.on('new-user-joined',name=>{
         console.log(name);
         users[socket.id]=name;
         contacts[name]=socket.id;
        //  socket.broadcast.emit('user-joined',name);


        createdb(name);

     });

     socket.on('send',message =>{
      createcollection(users[socket.id],message.name);
      createcollection(message.name,users[socket.id]);

{  let url = `mongodb://localhost:27017/${users[socket.id]}`;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(`${users[socket.id]}`);
        var myobj = { message: `${message.message}`, with: `${message.name}`,position:"right" };
        dbo.collection(`${message.name}`).insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });}

{    let url = `mongodb://localhost:27017/${message.name}`;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(`${message.name}`);
        var myobj = { message: `${message.message}`, with: `${users[socket.id]}`,position:"left" };
        dbo.collection(`${users[socket.id]}`).insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    }

         //console.log("send event has been trigerred");
         socket.to(contacts[message.name]).emit('receive',{messages: message.message,name: users[socket.id]});
     })
     socket.on('disconnect',message =>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })

    socket.on("getchat",person=>{
      console.log("get chat triggered");
 {       let url = `mongodb://localhost:27017/${users[socket.id]}`;
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(`${users[socket.id]}`);
        dbo.collection(`${person}`).find({}).toArray(function(err, result) {
          // if (err) throw err;
          socket.emit("takethis",result);
          db.close();
        });
      });
    }})

 })
