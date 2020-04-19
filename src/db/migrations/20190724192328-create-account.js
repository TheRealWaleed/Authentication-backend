
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Accounts", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    activated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    reset_token: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
    strategy: {
      type: Sequelize.ENUM({
        values: ["email", "googlePlus", "facebook", "linkedIn", "github"],
        allowNull: false,
        defaultValue: "email",
      }),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("Accounts"),
};
