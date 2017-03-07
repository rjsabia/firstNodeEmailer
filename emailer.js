'use strict';

const nodemailer = require('nodemailer');
const {logger} = require('./utilities/logger');

-// stored in `.env` -- never store passwords, api keys
// etc. inside source code
const {SMTP_URL} = process.env;


// `emailData` is an object that looks like this:
// {
//  from: "foo@bar.com",
//  to: "bizz@bang.com, marco@polo.com",
//  subject: "Hello world",
//  text: "Plain text content",
//  html: "<p>HTML version</p>"
// }
const sendEmail = (emailData, smtpUrl=SMTP_URL) => {
  //SMTP_URL='smtps://redbeardsoftware@gmail.com:rqdnxeoqbxffspqc@smtp.gmail.com'
  var sendmail = require('sendmail')();
 
// sendmail({
//     from: 'redbeardsoftware@gmail.com',
//     to: 'redbeardsoftware@gmail.com',
//     subject: 'SERVICE ALERTS',
//     html: 'Mail of test sendmail ',
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'redbeardsoftware@gmail.com',
      pass: 'rqdnxeoqbxffspqc'
    }
  });
  // const transporter = nodemailer.createTransport(SMTP_URL);
  logger.info(`Attempting to send email from ${emailData.from}`);
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
}


module.exports = {sendEmail};
