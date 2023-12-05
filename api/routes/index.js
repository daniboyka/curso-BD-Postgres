const express = require('express');
const productosRouter = require('./productosRouter'); //esot es como importar en la parte del cliente con import
const usersRouters = require('./usersRouters');
// const ordersRouters = require('./ordersRouters');
// const categoriaRouters = require('./categoriasRouters');

//con el const router = express.Router(); parece que hace que esto app.use('/api/v1/', router); sea fijo y el router es lo que va bariando
const routerApi = (app) => {
  app.use(express.json())
  const router = express.Router();
  app.use('/api/v1/', router);

  router.use('/productos', productosRouter);
  router.use('/usuario', usersRouters);
  // router.use('/my-orders', ordersRouters);
  // router.use('/categorias', categoriaRouters);
};

module.exports = routerApi;
