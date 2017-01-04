
const models = require('../../config/db.connect.js');

module.exports = {

   /**
   * lessByCat() queries for all lessons for each
   * Category
   *
   */
  lessByCat: (req, res, next) => {
    if (req.body.id) {
      models.Category.findAll({
        where: {
          id: req.query.id
        },
        include: [models.Lesson]
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
    } else {
      models.Category.findAll({
        include: [models.Lesson]
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
    }
  },

  /**
   * lessByUser() queries for all lessons for each
   * User
   *
   */
  lessByUser: (req, res, next) => {
    if (req.query.id) {
      models.User.findAll({
        where: {
          id: req.query.id
        },
        include: [models.Lesson]
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
    } else {
      models.User.findAll({
        include: [models.Lesson]
      })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
    }
  }

};
