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

router.post('/register/:lang', asyncHandler(register), login);
router.post('/verify', asyncHandler(verify));
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

  const registerLandingPage = `${config.hostname}:${config.port}/${req.params.lang}/auth/verify?id=${user._id}`;
  const mailOptions = {
    from: config.mail.auth.user,
    to: user.email,
    subject: strings[req.params.lang].mail.registrationSubject,
    html: strings[req.params.lang].mail.registrationHtml + `<a href="${config.protocol}://${registerLandingPage}">${registerLandingPage}</a>`
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

async function verify(req, res) {
  let assignRes = await userCtrl.assignRole(req.body, 'verified');
  res.json(assignRes);
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
