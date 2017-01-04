require('dotenv').config();

/**
 * Compiling all models into the model object
 * all models can now be accessed by models.[modelName]
 */
const models = require('./config/db.connect.js');

/**
 * Sync all SQL models and THEN start the express server,
 * otherwise you run the risk of your code running before
 * the models have finished syncing with the database
 *
 */
models.sequelize.sync().then(() => {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 8080;
  const routes = require('./routes/routes.js');
  let server = require('http').createServer(app);
  require('./config/sockets.config.js')(server); // All socket setup here
  require('./config/middleware.js')(app, express);
  app.use('/api', routes);

  server.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});
