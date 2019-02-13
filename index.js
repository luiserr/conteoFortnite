var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let jugadores = {
  luis: 0,
  jorge: 0,
  juan: 0
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('kill', ({asesino, asesinado}) => {
    console.log(asesinado)
    jugadores[asesino] = jugadores[asesino] + 1;
    io.emit('kill', { jugadores, mensaje: `${asesino} se disfruto a ${asesinado}`});
  });
  socket.on('reset', () => {
    jugadores = {
      luis: 0,
      jorge: 0,
      juan: 0
    };
    io.emit('kill', jugadores);
  });
});

http.listen(3333, function () {
  console.log('listening on *:3333');
});