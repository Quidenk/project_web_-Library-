const configSystem = require('../../config/system');

const dashboardRouter = require('./dashboard.route');
const booksRouter = require('./books.route');
const accountsRouter = require('./account.route');
// const publishersRouter = require('./publisher.route');
const authRouter = require('./auth.route');
const authMiddleware = require('../../middlewares/admin/auth.middlewares')
// const borrowsRouter = require('./')

module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/dashboard",
    dashboardRouter
  );

  app.use(
    ADMIN_PATH + "/book-list",
    // authMiddleware,
    booksRouter
  );

  app.use(
    ADMIN_PATH + "/account-list",
    // authMiddleware,
    accountsRouter
  );

  // app.use(
  //   ADMIN_PATH + "/borrow-list",
  //   // authMiddleware,
    
  // );
}