const Sequelize = require('sequelize');
const db = require('./db.connect.js');

module.exports = function (server) {
  let io = require('socket.io').listen(server);

  io.sockets.on('connection', function (socket) {
    socket.on('send-message', function (data) {
      db.Chatroom.findOne({
        where: {
          id: data.id
        }
      })
        .then(result => {
          if (result) {
            db.Chatroom.update(
              { chat: [...result.dataValues.chat, JSON.stringify(data.msg)] },
              { where: { id: data.id } }
            )
              .then(result => console.log('updating')
            )
              .catch(err => console.log('ERR', err)
            );
          }
        })
        .catch(function (err) {
          console.log('THIS IS ERR', err);
        });

      io.sockets.emit('get-message', data);
    });

    socket.on('send-room', function (data) {
      console.log('THIS IS ROOM DATA', data);
      db.Chatroom.findOne({
        where: {
          id: data
        }
      })
        .then(result => {
          io.sockets.emit('get-room', result);
        });
    });
  });
};
