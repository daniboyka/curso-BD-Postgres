// const { trace } = require('joi');
const express = require('express');
const userServices = require('./../services/userServices');
const validatorJoiHandler = require('./../middlewares/validetorHandler');
const {
  createUserSchema,
  modificarUserSchema,
  getUsersSchema,
} = require('../schemas/schemaUsers');
const router = express.Router();
const service = new userServices();

router.get('/', async (req, res) => {
  try {
    const personas = await service.find();
    res.status(200).send(personas);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(
  '/:id',
  validatorJoiHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const persona = await service.findOne(id);
      if (!persona) {
        res.status(400).json({
          message: `la persona con el ${id} no existe`,
        });
      } else {
        res.status(200).json({ persona });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorJoiHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const persona = await service.create(body);
      res.status(201).json({ persona, message: 'usuario creado' });
    } catch (error) {
      next(error)
    }
  },
);

router.patch(
  '/:id',
  validatorJoiHandler(getUsersSchema, 'params'), //primero verifica el id
  validatorJoiHandler(modificarUserSchema, 'body'), //despues mandamos el dato a modificar
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const persona = service.modificar(id, body);
      res.status(201).json({ persona, message: 'usuario fue modificado' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',validatorJoiHandler(getUsersSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).send({ respuesta });
  } catch (error) {
    next(error)
  }
});


// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     });
//   } else {
//     res.send('no existe');
//   }
// });

module.exports = router;
