const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Chatroom = sequelize.define('Chatroom', {
    name: {
      type: DataTypes.STRING
    },
    chat: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    }
  });

  return Chatroom;
};
