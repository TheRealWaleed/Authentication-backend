const authController = require('../controllers').authenticationController;

module.exports = (app) => {
  app.post('/register', authController.register);
  app.put('/login', authController.login);
  app.patch('/account-activation/:verify', authController.accountActivation);
  app.put('/send-rest-password', authController.sendResetPasswordLink);
  app.put('/update-password', authController.updatePassword);
};
