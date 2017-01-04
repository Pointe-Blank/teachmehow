const models = require('../../config/db.connect.js');

/**
 * when making get requests, the controller assumes the client is sending information as part of the
 * query object on the request
 */
module.exports = {

  getAllRequests: (req, res, next) => {
    models.Request.findAll()
    .then((requests) => {
      res.json(requests);
    })
    .catch((err) => {
      res.json(err);
      throw err;
    });
  },

  /**
   * addOneRequest inputs on body of request object:
   * req.body.userName
   * req.body.categoryName
   * req.body.requestName
   */
  addOneRequest: (req, res, next) => {
    console.log('RequestController (addOneRequest): In the add one request controller');
    console.log('RequestController (addOneRequest): Username that is sent', req.body.userName);
    let temp = {
      UserId: null,
      CategoryId: null
    };
    if (req.body.userId === undefined || req.body.requestName === undefined || req.body.categoryName === undefined) {
      res.json([]);
      return;
    }
    models.User.find({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      temp.UserId = user.dataValues.id;
      /**
       * findOrCreate returns a promise that consists of two values in an array
       * the first value is the returned instance
       * the second value is a boolean indicating whether the instance was created or note
       * true --> instance created
       * false --> instance found
       * */
      return models.Category.findOrCreate({
        where: {
          name: req.body.categoryName
        },
        defaults: {
          name: req.body.categoryName
        }
      });
    })
    .then((category) => {
      temp.CategoryId = category[0].dataValues.id;
      return models.Request.create({
        name: req.body.requestName,
        UserId: temp.UserId,
        CategoryId: temp.CategoryId
      });
    })
    .then((request) => {
      if (request) {
        res.json(request);
      } else {
        res.json([]);
      }
    })
    .catch((err) => {
      res.json(err);
      throw err;
    });
  },

  updateOneRequest: (req, res, next) => {
    /** will enable when upvote field added to request table */
    // let requestId = req.query.requestId;
    // models.Request.find({
    //   where: {
    //     id: requestId
    //   }
    // })
    // .then((request) => {
    //   request.dataValues.upvote = request.dataValues.upvote++;
    //   request.save().then((updatedRequest) => {
    //     res.json(updatedRequest)
    //   });
    // });
  }
};
