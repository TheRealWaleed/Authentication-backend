const chai = require('chai');

const { expect } = chai;
const http = require('chai-http');

chai.use(http);

// start app
const app = require('../../app');

describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  });
  it('GET / should return 200 and message', (done) => {
    chai.request(app).get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.contain('Ra welcomes you !');
        done();
      }).catch(done);
  });
});
