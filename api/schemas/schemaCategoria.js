const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri();

const createCategoriaSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const modificarCategoriSchema = Joi.object({
  name: name,
  image: image,
});

const getCategoriaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategoriaSchema, modificarCategoriSchema, getCategoriaSchema }
