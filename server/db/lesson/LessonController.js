const models = require('../../config/db.connect.js');

module.exports = {
  /**
  * getLesson() queries for all instances in the Lesson Table
  *
  * input(optional): queries for lesson with matching id
  *  or queries for everything
  *
  * output: result of query
  */

  getLesson: (req, res, next) => {
    if (req.query.lessonId) {
      models.Lesson.findOne({
        where: {
          id: req.query.lessonId
        }
      })
        .then(result => {
          let tmp = [];
          result === null || result === undefined ? result : tmp.push(result);
          res.json(tmp);
        })
        .catch(err => {
          throw err;
        // console.log("LessonCtrlr:getLesson: Error", err)
        });
    } else {
      models.Lesson.findAll({})
        .then(result => {
          let allItems = [];
          result.map(item => {
            allItems.push(item.dataValues);
          });
          res.json(result);
        })
        .catch(err => {
          throw err;
        // console.log("LessonCtrlr:getAll: Error trying to get all lessons", err)
        });
    }
  },

  addLesson: (req, res, next) => {
    if (!req.body.userName || !req.body.category) {
      res.json([]);
      return;
    }
    /**
     * Needs to check if the user or parameter even exists and grab
     * the foreign key before we store it
     */
    let lessonConfig = {
      UserId: null,
      CategoryId: null,
      ChatroomId: null,
      price: null,
      youtubeKey: null
    };
    lessonConfig.name = req.body.name ? req.body.name : null;
    lessonConfig.details = req.body.details ? req.body.details : null;
    lessonConfig.price = req.body.price ? req.body.price : null;
    lessonConfig.youtubeKey = req.body.youtubeKey ? req.body.youtubeKey : null;

    models.User.findOne({
      where: {
        name: req.body.userName
      }
    })
      .then(result => {
        /** Check if user exists AND is a teacher */
        if (result !== null && result.id && result.teachFlag) {
          lessonConfig.UserId = result.id;
          return models.Category.findOrCreate({
            where: {
              name: req.body.category
            },
            defaults: {
              name: req.body.category
            }
          });
        } else {
          res.json([]);
        }
      })
      .then(result => {
        /**
        * Create Chatroom
        * Will have the same Id as Lesson
        */
        lessonConfig.CategoryId = result[0].id;
        return models.Chatroom.create({
          name: `${req.body.name} Chatroom`,
          chat: []
        });
      })
      .then(result => {
        if (result) {
          /**
           * Find or create returns the instance created
           * and if bool if was already created
           */
          lessonConfig.ChatroomId = result.id;
          return models.Lesson.create({
            name: lessonConfig.name,
            details: lessonConfig.details,
            UserId: lessonConfig.UserId,
            CategoryId: lessonConfig.CategoryId,
            ChatroomId: lessonConfig.ChatroomId,
            price: lessonConfig.price,
            youtubeKey: lessonConfig.youtubeKey
          });
        } else {
          res.json([]);
        }
      })
      .then(result => {
        let tmp = [];
        if (result) {
          tmp.push(result);
          res.json(tmp);
        } else {
          res.json(tmp);
        }
      })
      .catch(err => {
        res.json(err);
        throw err;
      });
  },

  updateLesson: (req, res, next) => {
    if (!req.body.userId || !req.body.lessonId) {
      res.json([]);
      return;
    }
    /**
     * We need to check if the user or parameter even exists and grab
     * the foreign key before we store it. Client can only update
     * name and details as of now
     */
    let lessonConfig = {};
    lessonConfig.name = req.body.name ? req.body.name : null;
    lessonConfig.details = req.body.details ? req.body.details : null;
    lessonConfig.price = req.body.price ? req.body.price : null;
    lessonConfig.youtubeKey = req.body.youtubeKey ? req.body.youtubeKey : null;

    models.Lesson.findOne({
      where: {
        id: req.body.lessonId
      }
    })
      .then(result => {
        if (result) {
          /**
           * will update everything so the user needs to confirm on
           * the client side all the details
           */
          result.name = lessonConfig.name;
          result.details = lessonConfig.details;
          result.price = lessonConfig.price;
          result.youtubeKey = lessonConfig.youtubeKey;
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
