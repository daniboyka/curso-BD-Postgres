const express = require ('express');
const passport = require ('passport');
const orderServices = require('./../services/ordersServices');

const router = express.Router();

const service = new orderServices();

router.get('/my-orders',
passport.authenticate('jwt', {session: false}),//el manejo de session se una con cookies nosotros estamos usando JWT
 async (req, res, next) => {
  try {
    const user = req.user;
    const ordenes = await service.findByUser(user.sub)
    res.json(ordenes);
  } catch (error) {
   next(error)
  }
});




module.exports = router;
