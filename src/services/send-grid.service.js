const sgMail = require('@sendgrid/mail');

module.exports = {
  sendEmail(to, subject, template) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from: process.env.SENDGRID_API_EMAIL,
      subject,
      // text: '',
      html: template,
    };
    return sgMail.send(msg);
  },
};
