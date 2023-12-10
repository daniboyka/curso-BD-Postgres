const Joi = require('joi')

const id = Joi.number().integer();//---> antes tenia esto .string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);//---> antes tenia esto .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const modificarUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUsersSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, modificarUserSchema, getUsersSchema }
