const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const categoriaId = Joi.number().integer();

const createProductosSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  price: price.required(),
  description: description.required(),
  categoriaId: categoriaId.required(),
});

const modificarProductosSchema = Joi.object({
  name: name,
  image: image,
  price: price,
  description: description,
  categoriaId: categoriaId,
});

const getProductosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductosSchema, modificarProductosSchema, getProductosSchema }
