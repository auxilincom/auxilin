const { token, user, auth } = require('./middlewares');
const publicRoutes = require('./public');
const authenticatedRoutes = require('./authenticated');

const defineRoutes = (app) => {
  app.use(token);

  publicRoutes(app);

  app.use(auth);
  app.use(user);

  authenticatedRoutes(app);
};

module.exports = defineRoutes;
