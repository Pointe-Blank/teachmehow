const models = require('../../config/db.connect.js');

module.exports = {
  getChatroom: (req, res, next) => {
    if (req.query.id) {
      models.Chatroom.findOne({
        where: {
          id: req.query.id
        }
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          throw err;
        });
    } else {
      models.Chatroom.findAll({})
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          throw err;
        });
    }
  },

  addChatroom: (req, res, next) => {
    let temp = {
      LessonId: null
    };
    models.Lesson.find({
      where: {
        id: req.body.LessonId
      }
    })
      .then((lesson) => {
        console.log('lesson:', lesson);
        temp.LessonId = lesson[0].dataValues.id;
        return models.Chatroom.create({
          name: req.body.name,
          lessonId: temp.LessonId,
          chat: req.body.chat
        });
      })
      .then((chatroom) => {
        if (chatroom) {
          res.json(chatroom);
        } else {
          res.json([]);
        }
      })
      .catch((err) => {
        res.json(err);
        throw err;
      });
  },

  updateChatroom: (req, res, next) => {
    if (!req.params.chatroomId) {
      res.json([]);
      return;
    }

    let chatroomConfig = {};
    chatroomConfig.msg = req.body.msg ? req.body.msg : null;

    models.Chatroom.findOne({
      where: {
        id: req.params.chatroomId
      }
    })
      .then(result => {
        if (result) {
          result.chat.push(chatroomConfig.msg);
          return result.save();
        } else {
          res.json([]);
        }
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
        throw err;
      });
  }
};
