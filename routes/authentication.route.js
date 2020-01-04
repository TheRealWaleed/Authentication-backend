const accountController = require('../controllers')
module.exports = (app) => {
    app.post('/auth/register', accountController.register);
 };
