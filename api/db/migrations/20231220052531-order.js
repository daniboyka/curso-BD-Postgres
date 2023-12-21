'use strict';
const { orderSchema, ORDER_TABLE } = require('../models/order.models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(ORDER_TABLE, orderSchema)
  },

  async down (queryInterface) {
     await queryInterface.dropTable(ORDER_TABLE);// para volver atras lo que creamos con await queryInterface.createTable(USER_TABLE, UserSchema)

  }
};
