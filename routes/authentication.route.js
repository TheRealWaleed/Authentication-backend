const authController = require('../controllers').authenticationController;

module.exports = (app) => {
    app.post('/register', authController.register);
 };
