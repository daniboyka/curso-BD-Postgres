'use strict';
const { customerSchema, CUSTOMER_TABLE } = require('../models/customer.models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.createTable(CUSTOMER_TABLE, customerSchema)
  },

  async down (queryInterface) {
     await queryInterface.dropTable( )(CUSTOMER_TABLE);// para volver atras lo que creamos con await queryInterface.createTable(USER_TABLE, UserSchema)

  }
};
