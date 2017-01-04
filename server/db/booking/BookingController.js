const models = require('../../config/db.connect.js');

module.exports = {

  /**
   * getBooking() queries for all instances in the Booking Table
   *
   * input(optional): queries for categories with matching id
   *  or queries for everything
   *
   * output: result of query
   */

  getBooking: (req, res, next) => {
    if (req.query.id) {
      models.Booking.findAll({
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
      models.Booking.findAll({})
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          throw err;
        });
    }
  },

  addBooking: (req, res, next) => {
    console.log('req', req.body);
    let temp = {
      UserId: null,
      LessonId: null
    };
    if (req.body.UserId === undefined) {
      res.json([]);
      return;
    }
    models.User.find({
      where: {
        id: req.body.UserId
      }
    })
      .then((user) => {
        temp.UserId = user.dataValues.id;
        console.log('UserId', temp.UserId);
        /**
         * findOrCreate returns a promise that consists of two values in an array
         * the first value is the returned instance
         * the second value is a boolean indicating whether the instance was created or note
         * true --> instance created
         * false --> instance found
         * */
        return models.Lesson.findOrCreate({
          where: {
            id: req.body.LessonId
          },
          defaults: {
            id: req.body.LessonId
          }
        });
      })
      .then((lesson) => {
        console.log('lesson:', lesson);
        temp.LessonId = lesson[0].dataValues.id;
        return models.Booking.create({
          accept: true,
          details: req.body.details,
          Spare1: req.body.Spare1,
          UserId: temp.UserId,
          LessonId: temp.LessonId
        });
      })
      .then((booking) => {
        if (booking) {
          res.redirect(`/#!/lesson/${req.body.LessonId}/classroom`);
        } else {
          res.json([]);
        }
      })
      .catch((err) => {
        res.json(err);
        throw err;
      });
  }
};
