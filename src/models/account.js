
const bcrypt = require("bcrypt");
const keys = require("../config/keys");


module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    reset_token: {
      type: DataTypes.TEXT,
    },
    activated: {
      type: DataTypes.STRING,
    },
    strategy: {
      type: DataTypes.ENUM,
      values: ["email", "googlePlus", "facebook", "linkedIn", "github"],
      defaultValue: "email",
      allowNull: false,
    },
  }, {});
  Account.prototype.comparePassword = (password, callback) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }

      return callback(null, isMatch);
    });
  };
  // eslint-disable-next-line no-unused-vars
  Account.beforeCreate((account, option, callback) => {
    if (account.password != null) {
      const salt = bcrypt.genSaltSync(keys.jwt.slatRounds);

      return bcrypt.hash(account.password, salt)
        .then((hash) => {
          // eslint-disable-next-line no-param-reassign
          account.password = hash;
        })
        .catch((err) => {
          throw new Error(err);
        });
    }

    return undefined;
  });

  return Account;
};
