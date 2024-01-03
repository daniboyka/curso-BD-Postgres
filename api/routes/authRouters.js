const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const { config } = require('./../config/config');

const AuthServices = require('./../services/authService');
const router = express.Router();
const service = new AuthServices();

router.post(
  '/login',
  passport.authenticate('local', { session: false }), //el manejo de session se una con cookies nosotros estamos usando JWT
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/change-password',
//tarea validar con schema la pass y el token q es alfa numerico
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);


module.exports = router;
