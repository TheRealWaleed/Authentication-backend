const { assert } = require("chai");
const { describe } = require("mocha");
const AccountMock = require("../mocks/account.mock");

describe("Account model", () => {
  it("should be invalid if email is not unique", () => {
    const account1 = AccountMock();
    const account2 = AccountMock();
    assert.notEqual(account1.email, account2.email, "different email values");
  });
  it("should be invalid if strategy is not the enum values", () => {
    const account = AccountMock();
    assert.include(["email", "googlePlus", "facebook", "linkedIn", "github"], account.strategy);
  });
});
