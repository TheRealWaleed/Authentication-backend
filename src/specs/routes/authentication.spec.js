const describe = require('mocha').describe;
const it = require('mocha').it;
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const AccountMock = require ('../mocks/account.mock');
const app = require('../../app');
const Account = require('../../models').Account;

chai.use(http);

describe ('Authentication endpoints', () => {
    describe('register', () => {
        it('should returns 201 and validation input', (done) => {
            const account = {
                email: "test@test.fr",
                password: "Test1234#"
            };
            chai.request(app).post('/register')
                .send(account)
                .end((err,res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.be.equal("Account created and validation email sent!");
                    expect(res.body.errors).to.be.equal(undefined);
                    done();
            })
        })
    });
    describe('login', () => {
        it('should returns 200 and return token', (done) => {
            const account = {
                email: 'test@test.com',
                password: 'TestAuth0453#'
            };
            chai.request(app).post('/login')
                .send(account)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.cookie('token');
                    expect(res.body.errors).to.be.equal(undefined);
                    done();
                })

        });
    })
});
