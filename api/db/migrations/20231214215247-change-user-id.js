'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id',{
    field:'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
   })
  },

  async down (queryInterface) {
    //  await queryInterface.dropTable( )(CUSTOMER_TABLE);// para volver atras lo que creamos con await queryInterface.createTable(USER_TABLE, UserSchema)

  }
};
