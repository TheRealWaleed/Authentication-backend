'use strict';
const bcrypt = require('bcrypt');
const keys = require('../config/keys');


module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    reset_token: {
      type: DataTypes.TEXT
    },
    activated: {
      type: DataTypes.STRING
    },
    strategy: {
      type: DataTypes.ENUM,
        values: ['email', 'googlePlus', 'facebook', 'linkedIn', 'github'],
        defaultValue: 'email',
        allowNull: false
    }
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
  };
  Account.prototype.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return callback(err);
      }
      console.log(isMatch)
      callback(null, isMatch);
    });
  };
  Account.beforeCreate((account, option, callback) => {
    if (account.password != null){
      const salt = bcrypt.genSaltSync(keys.jwt.slatRounds);
      return bcrypt.hash(account.password, salt)
          .then(hash => {
            account.password = hash;
          })
          .catch(err => {
            throw new Error();
          });
    }

  });
  return Account;
};
