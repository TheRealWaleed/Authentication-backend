const Account = require('../models').Account;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const validator = require('../services').passwordValidator;
const Mailer = require('../services').sendGridService;
const URL = require('url').Url;

module.exports = {

    register(req, res) {
        const passwordErrors = validator.validatePassword(req.body.password);
        if (passwordErrors.length > 0) {
            return res.status(400).send({errors: passwordErrors});
        } else {
            return Account.create({
                email: req.body.email,
                password: req.body.password
            })
                .then(account => {
                    let link = 'activate';
                    Mailer.sendEmail(account.email, 'Activate your account', 'Click on this link to ' + link.link('http://localhost:3000/auth/activate/' + account.id) + ' your account')
                        .then(() => res.status(201).send({message: "Account created and validation email sent!"}))
                        .catch(err => res.status(400).send({error: err, message: err.message, stack: err.stack}));
                })
                .catch(error => res.status(400).send({error: error, message: error.message, stack: error.stack}));
        }
    },

};
