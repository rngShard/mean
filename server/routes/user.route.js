const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', asyncHandler(getAll));
router.post('/', asyncHandler(insert));

async function getAll(req, res) {
  let users = await userCtrl.getAll();
  res.json(users);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
