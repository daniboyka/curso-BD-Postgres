const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.models');

const CUSTOMER_TABLE = 'customer';

const customerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  userId:{
    field:'user_id',
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Customer extends Model {
  static associate(models) {
    //associate
    this.belongsTo(models.User, {as: 'user'});
    //aca un cliente puede tener muchas ordenes de compras(hasMany() uno a muchos)
    this.hasMany(models.Order, {as: 'orders', foreignKey: 'customerId'});
  }

  static config(sequelize) {// estatico
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, customerSchema, Customer }
