var express = require('express');
var router = express.Router();

router.use(express.static('assets/'));
//handle post service request
router.post('/send', function (req, res, next) {

  //first send it using API 1
  var api_key = 'key-6f357ace728d75d3a370750a5b8ac0f3';
  var domain = 'sandbox01c692f864ba4408a47c144b3170a5d6.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: 'postmaster@sandbox01c692f864ba4408a47c144b3170a5d6.mailgun.org',
    to: req.body.to,
    cc:req.body.cc,
    bcc:req.body.bcc,
    subject: req.body.subject,
    text: req.body.bodyText
  };

  mailgun.messages().send(data, function (error, body) {
    if(!error){
      console.log('Email sent using Mailgun: ');
      res.send({message : "Mail has been sent Successfully using Mailgun API",msgType:"success"});
    }else{
      //error occurred, try sending it using API 2
      var nodemailer = require('nodemailer');
      console.log('Error Occurred while sending from MailGun API, now trying to send it using nodemailer.. ');
      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '******@gmail.com',
          pass: '*****************'
        }
      });
      
      var mailOptions = {
        from: 'pramodjainofficial@gmail.com',
        to: req.body.to,
        cc:req.body.cc,
        bcc:req.body.bcc,
        subject: req.body.subject,
        text: req.body.bodyText
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error occurred while sending mail using nodemailer :  ' + error);
          res.send({message : "Error Occurred, could not be sent from both the API's",msgType:"error"});
        } else {
          console.log('Email sent using alternative API : nodemailer: ' + info.response);
          res.send({message : "Email sent using alternative API : nodemailer",msgType:"success"});
        }
      }); 

     
    }
  });
});

module.exports = router;