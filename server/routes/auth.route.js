const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const nodemailer = require('nodemailer');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const strings = require('../config/strings');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


var transporter = nodemailer.createTransport({
  service: config.mail.service,
  auth: {
    user: config.mail.auth.user,
    pass: config.mail.auth.pass
  }
});
async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;

  var mailOptions = {
    from: config.mail.auth.user,
    to: user.email,
    subject: strings.de.mail.registrationSubject,
    html: strings.de.mail.registrationHtml
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.error('Something went wrong in sending registration mail: ', error);
    } else {
      console.log('Email sent: ' + info.response);
      next();
    }
  });
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
