const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', asyncHandler(getAll));
router.post('/', asyncHandler(insert));
router.post('/update/toggleRole', asyncHandler(toggleRole))

async function getAll(req, res) {
  let users = await userCtrl.getAll();
  res.json(users);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function toggleRole(req, res) {
  let newVal = await userCtrl.toggleRole(req.body.email, req.body.role, req.body.assign);
  res.json(newVal);
}