var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let jugadores = {
  luis: {
    kills: 0,
    perras: {
    }
  },
  jorge: {
    kills: 0,
    perras: {
    }
  },
  juan: {
    kills: 0,
    perras: {
    }
  }
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('kill', ({ asesino, asesinado }) => {
    console.log(asesinado)
    jugadores[asesino]['kills'] = jugadores[asesino]['kills'] + 1;
    jugadores[asesino]['perras'][asesinado] = jugadores[asesino]['perras'][asesinado] ? jugadores[asesino]['perras'][asesinado] + 1 : 1;
    io.emit('kill', { jugadores, mensaje: `${asesino} se disfruto a ${asesinado}` });
  });
  socket.on('reset', () => {
    jugadores = {
      luis: {
        kills: 0,
        perras: {
        }
      },
      jorge: {
        kills: 0,
        perras: {
        }
      },
      juan: {
        kills: 0,
        perras: {
        }
      }
    }
    io.emit('kill', jugadores);
  });
});

http.listen(3333, function () {
  console.log('listening on *:3333');
});