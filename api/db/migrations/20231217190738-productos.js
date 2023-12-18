'use strict';
const { productosSchema, PRODUCTO_TABLE } = require('../models/producto.models')
const { categoriaSchema, CATEGORIA_TABLE } = require('../models/categoria.models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIA_TABLE, categoriaSchema)
   await queryInterface.createTable(PRODUCTO_TABLE, productosSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable( )(CATEGORIA_TABLE);
     await queryInterface.dropTable( )(PRODUCTO_TABLE);// para volver atras lo que creamos con await queryInterface.createTable(USER_TABLE, UserSchema)

  }
};
