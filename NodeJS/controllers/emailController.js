/*const express = require('express');

    nodeMailer = require('nodemailer');
   

    var router = express();

    router.post('/send-email', function (req, res) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'ghofraneg285@gmail.com',
              pass: '51544474'
          }
       
      });
      let mailOptions = {
          from: '"Krunal Lathiya" <ghofraneg285@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
        
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
              console.log(info);
          });
      });
      module.exports = router;
*/
const express = require('express');
const nodemailer = require('nodemailer');
const router = express();

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'ghofraneg285@gmail.com', // Enter here email address from which you want to send emails
    pass: '51544474' // Enter here password for email account from which you want to send emails
  },
  tls: {
  rejectUnauthorized: false
  }
});



router.post('/send-email', function (req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  let senderName = req.body.contactFormName;
  let senderTOEmail = req.body.contactFormTOEmail;
  let messageSubject = req.body.contactFormSubjects;
  let messageText = req.body.contactFormTOMessage;
  let copyToSender = req.body.contactFormTOCopy;

  
  let mailOptions = {
    to:senderTOEmail, // Enter here the email address on which you want to send emails from your customers
    from: senderName,
    subject: messageSubject,
    text: messageText,
    replyTo: senderTOEmail
    /*to: req.body.to, // list of receivers
    subject: req.body.messageSubject, // Subject line
    text: req.body.messageText, // plain text body
    html: '<b>NodeJS Email Tutorial</b>' */
  };

  if (senderName === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (senderTOEmail === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageSubject === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (copyToSender) {
    mailOptions.to.push(senderTOEmail);
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

module.exports = router;