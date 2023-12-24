const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const categoriaId = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

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

const queryProductosSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),

});

module.exports = { createProductosSchema, modificarProductosSchema, getProductosSchema, queryProductosSchema }
