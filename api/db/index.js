const { User, UserSchema } = require('./models/user.models');
const { Customer, customerSchema } = require('./models/customer.models');
const { Productos, productosSchema } = require('./models/producto.models');
const { Categorias, categoriaSchema } = require('./models/categoria.models');
const { Order, orderSchema } = require('./models/order.models');
const { OrderProducto, orderProductoSchema } = require('./models/order-productos.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));//QUIERO INICIALIZAR UN (UserSchema) Y SU CONFIGURACION ES (UserSchema)
  Customer.init(customerSchema, Customer.config(sequelize));
  Categorias.init(categoriaSchema, Categorias.config(sequelize));
  Productos.init(productosSchema, Productos.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderProducto.init(orderProductoSchema, OrderProducto.config(sequelize));

  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Categorias.associate(sequelize.models)
  Productos.associate(sequelize.models)
  Order.associate(sequelize.models)
  OrderProducto.associate(sequelize.models)
}

module.exports = setupModels;
