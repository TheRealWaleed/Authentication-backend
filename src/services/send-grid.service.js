const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

module.exports = {
    sendEmail(to, subject, template) {
        sgMail.setApiKey(keys.sendGrid.apiKey);
        const msg = {
            to: to,
            from: keys.sendGrid.mail,
            subject: subject,
            //text: '',
            html: template,
        };
        return sgMail.send(msg);
    }
}
