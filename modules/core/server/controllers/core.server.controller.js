'use strict';

var request = require('request');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'settlejonathen@gmail.com',
    pass: 'Ratandpig13'
  },
  debug: true
});

var PUBLIC_KEY = '6LdW_hwTAAAAAN1J8l7A3gniCRA930e0OtvIf7j8';
var PRIVATE_KEY = '6LdW_hwTAAAAADPsvINKPCnJRe4jTW31yqy7lywQ';

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

/**
 * Send an e-mail when the contact form is submitted
 */
exports.sendMail = function (req, res) {

  var data = req.body;

  console.log(data.captcha);

  request.post({
    url: 'https://www.google.com/recaptcha/api/siteverify', 
    form: { 
      secret: PRIVATE_KEY, 
      response: data.captcha
    }
  },function (err, response, body) {
    console.log(body);
    console.log(body.success);

    var parsedBody = JSON.parse(body);
    console.log(parsedBody);
    console.log(parsedBody.success);

    if(err){
      console.log('ERROR:\n',err);
    }
    //if the request to googles verification service returns a body which has false within it means server failed
    //validation, if it doesnt verification passed
    if (parsedBody.success) {
      //console.log(res.error-codes);

      var mailOptions = {
        from: data.email, // sender address
        to: 'settlejonathen@gmail.com', // list of receivers
        subject: 'Message from ' + data.name + ' via SoundPadLab app', // Subject line
        text: data.email + ' sent some template message and ' + data.msg, // plaintext body
      };

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
	  res.send(parsedBody.success);
    } else {
      //res.send(500);
      console.log('CAPTCHA NOT VALID');
      res.send(500, {error: 'CAPTCHA NOT VALID'});
    }
  });

  //res.json(data);
};
