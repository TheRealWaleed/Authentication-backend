const sendGrid = require('./../../services').sendGridService;


describe('SendGrid service', () => {
    it('should send an email ', () => {
        sendGrid.sendEmail('test@test.tn', 'Ra | Unit Test', 'Unit Test works !')
            .then(res => {
                console.log({res: res });
            })
            .catch(err => console.error(err))
    });
});
