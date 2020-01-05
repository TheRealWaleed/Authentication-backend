const Account = require('../models').Account;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const validator = require('../services').passwordValidator;
const URL = require('url').Url;

module.exports = {

    register(req, res) {
        const passwordErrors = validator.validatePassword(req.body.password);
        if (passwordErrors.length > 0) {
            return res.status(400).send({errors:passwordErrors});
        } else {
            return Account.create({
                email: req.body.email,
                password: req.body.password
            })
                .then( account => {
                    res.status(201).send({message: "Account created!"});
                })
                .catch( error => res.status(400).send({error:error, message: error.message, stack: error.stack}));
        }

    },

};
