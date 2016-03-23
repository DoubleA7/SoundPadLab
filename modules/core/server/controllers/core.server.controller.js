'use strict';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'settlejonathen@gmail.com',
    pass: '*******'
  },
  debug: true
});

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

  var mailOptions = {
    from: data.email, // sender address
    to: 'settlejonathen@gmail.com', // list of receivers
    subject: 'Message from ' + data.name + 'via SoundPadLab app', // Subject line
    text: data.msg, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });

  res.json(data);
};