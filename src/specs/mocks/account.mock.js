const faker = require("faker");

module.exports = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  password: faker.name.findName(),
  activated: faker.random.boolean(),
  reset_token: faker.random.alphaNumeric(),
  strategy: faker.random.arrayElement(["email", "googlePlus", "facebook", "linkedIn", "github"]),
});
