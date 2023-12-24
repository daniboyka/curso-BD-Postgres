const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.models');
// const { OrderProducto } = require('./order-productos.models');

const ORDER_TABLE = 'orders';

const orderSchema = {
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
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // total: {
  //   type: DataTypes.VIRTUAL,
  //   get() {
  //     if (this.items.length > 0) {
  //       return this.items.reduce((total, item) => {
  //         return total + (item.price * item.OrderProducto.amount);
  //       }, 0);
  //     }
  //     return 0;
  //   }
  // }
  total:{
    type: DataTypes.VIRTUAL,
    get(){
      try{
      if(this.items.length > 0){
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProducto.amount);
        },0);
      }
    }catch(err){}
    }
  }
};

class Order extends Model {
  static associate(models) {
    //associate
    // una orden pertenezca a varios cliente (costomer)
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Productos, {
      as: 'items',
      through: models.OrderProducto,
      foreignKey: 'orderId',
      otherKey: 'productoId',
    });
  }

  static config(sequelize) {
    // estatico
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, orderSchema, Order };
