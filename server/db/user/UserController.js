const models = require('../../config/db.connect.js');

module.exports = {

  getAllUsers: (req, res, next) => {
    models.User.findAll({})
    .then((users) => {
      res.json(users);
    });
  },

  getUserDetails: (req, res, next) => {
    models.User.find({
      where: {
        id: req.params.userId
      }
    })
    .then((user) => {
      let tmp = [];
      if (user) tmp.push(user);
      res.json(tmp);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  addOneUser: (req, res, next) => {
    models.User.create({
     name: req.body.name,
     teachFlag: req.body.teachFlag,
     rating: null,
     bio: req.body.bio,
     picture: req.body.picture,
     auth: req.body.auth,
     spare1: req.body.spare1
   })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  findUser: (req, res, next) => {
    models.User.find({
      where: {
        auth: req.body.auth
      }
    }).then((user) => {
      let tmp = [];
      if (user) tmp.push(user);
      res.json(tmp);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  updateUserBio: (req, res, next) => {
    models.User.update(
      {
        bio: JSON.stringify(req.body)
      },
      {
        where: {
          id: req.params.userId
        }
      })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
      throw err;
    });
  },

  updateUserTeachFlag: (req, res, next) => {
    models.User.update(
      {
        teachFlag: true
      },
      {
        where: {
          id: req.params.userId
        }
      })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  updateUserName: (req, res, next) => {
    models.User.update(
      {
        name: req.body.name
      },
      {
        where: {
          id: req.params.userId
        }
      })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
  }
};
