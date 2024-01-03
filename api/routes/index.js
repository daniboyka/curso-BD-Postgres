const express = require('express');
const productosRouter = require('./productosRouter'); //esot es como importar en la parte del cliente con import
const usersRouters = require('./usersRouters');
const customerRouters = require('./customerRouter');
const categoriaRouters = require('./categoriasRouters');
const ordersRouters = require('./ordersRouters');
const authRouters = require('./authRouters');
const profileRouters = require('./profileRouters');

//con el const router = express.Router(); parece que hace que esto app.use('/api/v1/', router); sea fijo y el router es lo que va bariando
const routerApi = (app) => {
  app.use(express.json())
  const router = express.Router();
  app.use('/api/v1/', router);
  router.use('/productos', productosRouter);
  router.use('/usuario', usersRouters);
  router.use('/customer', customerRouters);
  router.use('/categorias', categoriaRouters);
  router.use('/orders', ordersRouters);
  router.use('/auth', authRouters);
  router.use('/profile', profileRouters);

};

module.exports = routerApi;
