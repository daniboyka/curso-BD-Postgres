const express = require('express');
const categoriaServices = require('./../services/categoriasServices');
const validatorJoiHandler = require('./../middlewares/validetorHandler');
const { checkRoles } = require('./../middlewares/authHandler');
const {
  createCategoriaSchema,
  modificarCategoriSchema,
  getCategoriaSchema,
} = require('../schemas/schemaCategoria');
const router = express.Router();
const passport = require('passport');

const service = new categoriaServices();

router.get('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin', 'seller', 'customer'), async (req, res) => {
  try {
    const categoria = await service.find();
    res.status(200).send(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorJoiHandler(getCategoriaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.findOne(id);
      if (!categoria) {
        res.status(400).json({
          message: `la categoria con el ${id} no existe`,
        });
      } else {
        res.status(200).json({ categoria });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }), // la autorizacion es el tipo (Bearer ) con ese espacn al final
  checkRoles('admin'),
  validatorJoiHandler(createCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const categoria = await service.create(body);
      res.status(201).json({ categoria, message: 'usuario creado' });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorJoiHandler(getCategoriaSchema, 'params'), //primero verifica el id
  validatorJoiHandler(modificarCategoriSchema, 'body'), //despues mandamos el dato a modificar
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const categoria = service.modificar(id, body);
      res.status(201).json({ categoria, message: 'categoria fue modificado' });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorJoiHandler(getCategoriaSchema, 'params'),
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
