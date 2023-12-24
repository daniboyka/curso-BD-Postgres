'use strict';
const { orderProductoSchema, ORDER_PRODUCTO_TABLE } = require('../models/order-productos.models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(ORDER_PRODUCTO_TABLE, orderProductoSchema)
  },

  async down (queryInterface) {
     await queryInterface.dropTable(ORDER_PRODUCTO_TABLE);// para volver atras lo que creamos con await queryInterface.createTable(USER_TABLE, UserSchema)

  }
};
