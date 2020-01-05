const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const AccountMock = require ('../mocks/account.mock');
const app = require('../../app');

chai.use(http);

describe ('Authentication endpoints', () => {
    describe('register', () => {
        it('should returns 201 and validation input', (done) => {
            const account = {
                email: "test50@test.com",
                password: "Test1234#"
            };
            chai.request(app).post('/register')
                .send(account)
                .end((err,res) => {
                expect(res).to.have.status(201);
                expect(res.body.message).to.be.equal("Account created!");
                expect(res.body.errors).to.be.equal(undefined);
                done();
            })
        })
    });
});
