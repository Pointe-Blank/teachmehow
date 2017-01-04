
const models = require('../../config/db.connect.js');

module.exports = {

  /**
   * getcat() queries for all instances in the Category Table
   *
   * input(optional): queries for categories with matching id
   *  or queries for everything
   *
   * output: result of query
   */
  getCat: (req, res, next) => {
    if (req.query.id) {
      models.Category.findAll({
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
      models.Category.findAll({})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      });
    }
  }
};
