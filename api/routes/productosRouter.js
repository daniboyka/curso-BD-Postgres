// const { faker } = require('@faker-js/faker');
const express = require('express');
const ProductosServices = require('./../services/productosServices');
const validatorJoiHandler = require('./../middlewares/validetorHandler');
const { createProductosSchema, modificarProductosSchema, getProductosSchema } = require('../schemas/schemaProductos');

const router = express.Router();
const service = new ProductosServices();

router.get('/', async (req, res) => {
  try {
    const productos = await service.find();
    res.json(productos);
  } catch (error) {
    res.status(400), console.log(error)
  }
});

router.get('/:id',
validatorJoiHandler(getProductosSchema, "params"),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await service.findOne(id);
    if (!producto) {
      res.status(400).json({
        message: `El producto con id ${id} no existe`,
      });
    } else {
      res.status(200).json({ producto });
    }
  } catch (error) {
    next(error)
  }
});

router.post('/',
validatorJoiHandler(createProductosSchema, "body"),
async (req, res) => {
  try {
    const body = req.body;
    const producto = await service.create(body);
    res.status(201).json({ producto });
  } catch (error) {
    res.status(401).json({message: error.message})
  }
});

router.patch('/:id',
validatorJoiHandler(getProductosSchema, "params"), //primero verifica el id
validatorJoiHandler(modificarProductosSchema, "body"),//despues mandamos el dato a modificar
async (req, res, next) => {
try {
  const { id } = req.params;
  const body = req.body;
  const modificacion = await service.modificar(id, body);
  res.status(201).json({ modificacion });
} catch (error) {
  next(error)
}

});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).send({ respuesta });
  } catch (error) {
    res.status(401).json({message: error.message})
  }
});

module.exports = router;
