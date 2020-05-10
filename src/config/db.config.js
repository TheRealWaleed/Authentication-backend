require('dotenv').config();

const devUrl = `postgres://${process.env.DEV_DATABASE_USERNAME}:${process.env.DEV_DATABASE_PASSWORD}@${process.env.DEV_DATABASE_HOST}:${process.env.DEV_DATABSE_PORT}/${process.env.DEV_DATABASE_NAME}`;
const prodUrl = `postgres://${process.env.PROD_DATABASE_USERNAME}:${process.env.PROD_DATABASE_PASSWORD}@${process.env.PROD_DATABASE_HOST}:${process.env.PROD_DATABSE_PORT}/${process.env.PROD_DATABASE_NAME}`;
const testUrl = `postgres://${process.env.TEST_DATABASE_USERNAME}:${process.env.TEST_DATABASE_PASSWORD}@${process.env.TEST_DATABASE_HOST}:${process.env.TEST_DATABSE_PORT}/${process.env.TEST_DATABASE_NAME}`;

module.exports = {
  development: {
    url: devUrl,
    username: process.env.DEV_DATABASE_USERNAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    url: prodUrl,
    username: process.env.PROD_DATABASE_USERNAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    host: process.env.PROD_DATABASE_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  },
  test: {
    url: testUrl,
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
