const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.models');
const { PRODUCTO_TABLE } = require('./producto.models');

const ORDER_PRODUCTO_TABLE = 'order_producto';

const orderProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    llowNull: false,
    type: DataTypes.INTEGER,
  },
  productoId: {
    field: 'producto_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCTO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrderProducto extends Model {
  static associate(models) {
    //associate

  }

  static config(sequelize) {
    // estatico
    return {
      sequelize,
      tableName: ORDER_PRODUCTO_TABLE,
      modelName: 'OrderProducto',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCTO_TABLE, orderProductoSchema, OrderProducto };
