const authenticateToken = require('../app/middlewares/authenticateToken');
const serviceRouter = require('./service');
const authRouter = require('./auth');

function route(app) {
    app.use('/api/auth/', authRouter);
    app.use(authenticateToken);
    app.use('/api/admin/service', serviceRouter);
}

module.exports = route;
