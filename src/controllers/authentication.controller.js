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
    login(req, res) {
        return Account.findOne({
            where:{email: req.body.email}
        })
            .then(account => {
                account.comparePassword(req.body.password, (err, isMatch)=> {
                    if (isMatch && !err) {
                        const token = jwt.sign({ account: account }, keys.jwt.secret, {
                            algorithm: 'HS256',
                            expiresIn: 86400
                        });
                        res.cookie('token', token, { maxAge: 900000, httpOnly: false })
                            .status(200).send({success: true, account: account});
                    } else {
                        res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
                    }
                });
            })
            .catch( error => res.status(400).send({error: error, hint: 'Authentication failed. Wrong password.', message: error.message, stack: error.stack}));

    },
    accountActivation(req,res) {
        return Account.findOne(
            {
                where:
                    {
                        id: req.params.verify
                    }
            })
            .then(account => {
                if (account.activated === true) {
                    res.status(200).send({success: true, msg:'Account already activated'})
                }
                else if (account.activated === false) {
                    account.activated = true;
                    account.save()
                        .then(e => res.status(200).send({success: true, account:e, msg:'Account activated'}))
                        .catch(error => {res.status(400).send({error:error, message: error.message, stack: error.stack})})
                }
            })
            .catch(error => res.status(500).send({error:error, success: true, hint: 'No account.', message: error.message, stack: error.stack}))
    },

    sendResetPasswordLink(req,res) {
        return Account.findOne({
            where:{
                email: req.body.email}
        })
            .then(account => {
                const resetToken =jwt.sign({ account: account }, keys.jwt.secret, {
                    expiresIn: 3600 // 1 hour
                });
                account.reset_token = resetToken;
                account.save().then(account => {
                    let link = "this link";
                    Mailer.sendEmail(account.email,'Reset password','Click on this link to reset your password '+URL.parse("http://localhost:4200/reset-password/"+resetToken))
                        .then(success => {
                            res.status(200).send({success: success, msg: 'Link has been sent'})
                        })
                        .catch(error => res.status(500).send({error:error, hint: 'send mail has been failed', message: error.message, stack: error.stack}))
                })
                    .catch(err => res.status(500).send({error: err, hint: 'database error', message: err.message, stack: err.stack}));
            })
            .catch( error => res.status(400).send({error: error, hint: 'Account not found.', message: error.message, stack: error.stack}));
    },

    updatePassword(req,res) {
        const token = req.body.reset_token;
        const expireIn = jwt.decode(token).exp;
        if (Date.now() >= expireIn * 1000) {
            res.status(401).send({success: false, hint: 'Your token has been expired'});
        } else {
            if (req.body.new_password === req.body.confirm_password) {
                Account.findOne({
                    where: {
                        id: req.body.id
                    }
                })
                    .then(account => {
                        const salt = bcrypt.genSaltSync(keys.jwt.slatRounds);
                        bcrypt.hash(req.body.new_password, salt)
                            .then(hash => {
                                account.password = hash;
                                account.save()
                                    .then(()=> {
                                        res.status(200).send({success: true, msg: 'Password updated', account: account});
                                    })
                                    .catch(error => {
                                        res.status(error.response.status).send({error: error});
                                    })
                            })
                            .catch(err => {
                                res.status(500).send({error:err, msg: 'Problem in encrypting password'})
                            });
                    })
                    .catch(error =>  res.status(500).send({success: false,  hint: 'Database issue', message: error.message, stack: error.stack}));
            }
            else {
                res.status(500).send({success: false, hint: 'password do not match'})
            }
        }
    },
};
