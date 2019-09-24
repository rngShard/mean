const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  getAll,
  insert,
  assignRole,
  revokeRole
}

async function getAll() {
  return await User.find();
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function assignRole(userId, role) {
  return await User.updateOne({_id: userId}, {$addToSet: {roles: role}});
}

async function revokeRole(userId, role) {   // requires testing still!
  return await User.updateOne({_id: userId}, {$pull: {roles: role}});
}
