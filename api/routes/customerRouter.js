// const { trace } = require('joi');
const express = require('express');
const customerServices = require('./../services/customerServices');
const validatorJoiHandler = require('./../middlewares/validetorHandler');
const {
  createCustomerSchema,
  modificarCustomerSchema,
  getCustomerSchema,
} = require('../schemas/schemaCustomer');
const router = express.Router();
const service = new customerServices();

router.get('/', async (req, res) => {
  try {
    const cliente = await service.find();
    res.status(200).send(cliente);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(
  '/:id',
  validatorJoiHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cliente = await service.findOne(id);
      if (!cliente) {
        res.status(400).json({
          message: `la persona con el ${id} no existe`,
        });
      } else {
        res.status(200).json({ cliente });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorJoiHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const cliente = await service.create(body);
      res.status(201).json({ cliente, message: 'usuario creado' });
    } catch (error) {
      next(error)
    }
  },
);

router.patch(
  '/:id',
  validatorJoiHandler(getCustomerSchema, 'params'), //primero verifica el id
  validatorJoiHandler(modificarCustomerSchema, 'body'), //despues mandamos el dato a modificar
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const cliente = service.modificar(id, body);
      res.status(201).json({ cliente, message: 'usuario fue modificado' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',validatorJoiHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).send({ respuesta });
  } catch (error) {
    next(error)
  }
});


module.exports = router;
