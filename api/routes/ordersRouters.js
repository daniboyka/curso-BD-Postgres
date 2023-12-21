// const { trace } = require('joi');
const express = require('express');
const orderServices = require('./../services/ordersServices');
const validatorJoiHandler = require('./../middlewares/validetorHandler');
const { createOrderSchema, getOrderSchema } = require('../schemas/schemeOrder');
const router = express.Router();
const service = new orderServices();

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
  validatorJoiHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      if (!order) {
        res.status(400).json({
          message: `la order con el ${id} no existe`,
        });
      } else {
        res.status(200).json({ order });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorJoiHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await service.create(body);
      res.status(201).json({ order, message: 'order creado' });
    } catch (error) {
      next(error);
    }
  },
);

// router.patch(
//   '/:id',
//   validatorJoiHandler(getCustomerSchema, 'params'), //primero verifica el id
//   validatorJoiHandler(modificarCustomerSchema, 'body'), //despues mandamos el dato a modificar
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const { id } = req.params;
//       const cliente = service.modificar(id, body);
//       res.status(201).json({ cliente, message: 'usuario fue modificado' });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

router.delete(
  '/:id',
  validatorJoiHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await service.delete(id);
      res.status(200).send({ respuesta });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
