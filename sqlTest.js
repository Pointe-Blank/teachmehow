const models = require('./server/config/db.connect.js');
// pretend this is a controller
module.exports = () => {
  let tmp = {
      teachId: null,
      catId: null,
      catIdDance: null
    };
  console.log('in test');
  models.User.create({
      name: 'Khoa',
      teachFlag: 0
    })
    .then((result) => {
      return models.User.create({
        name: 'Nate',
        teachFlag: 0
      });
    })
    .then((result) => {
      return models.User.create({
        name: 'Kevin',
        teachFlag: 0
      });
    })
    .then((result) => {
      return models.User.create({
        name: 'Ricky',
        teachFlag: 1
      });
    })
    .then((result) => {
      console.log('----- Result of User add', result.dataValues);
      tmp.teachId = result.dataValues.id;
      return models.Category.create({
          name: 'driving'
        });
    })
    .then((result) => {
      console.log('----- Result of Category add', result.dataValues);
      tmp.catId = result.dataValues.id;
      return models.Lesson.create({
          name: 'How to drift',
          UserId: tmp.teachId,
          CategoryId: tmp.catId
        });
    })
     .then((result) => {
       console.log('----- Result of Category add', result.dataValues);
       return models.Lesson.create({
          name: 'How to do a drive stick',
          UserId: tmp.teachId,
          CategoryId: tmp.catId
        });
     })

      .then((result) => {
        return models.User.create({
        name: 'Daria',
        teachFlag: 1
      });
      })
    .then((result) => {
      console.log('----- Result of User add', result.dataValues);
      tmp.teachId = result.dataValues.id;
      return models.Category.create({
          name: 'dance'
        });
    })
    .then((result) => {
      console.log('----- Result of Category add', result.dataValues);
      tmp.catIdDance = result.dataValues.id;
      return models.Lesson.create({
          name: 'How to drift',
          UserId: tmp.teachId,
          CategoryId: tmp.catId
        });
    })
     .then((result) => {
       console.log('----- Result of Category add', result.dataValues);
       return models.Lesson.create({
          name: 'How to dougie',
          UserId: tmp.teachId,
          CategoryId: tmp.catIdDance
        });
     })

    .catch(err => {
      console.log('there was an error in the test', err);
    });
};
