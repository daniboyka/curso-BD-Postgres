const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIA_TABLE } = require('./categoria.models')


const PRODUCTO_TABLE = 'productos';

const productosSchema = {
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
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  categoriaId:{
    field:'categoria_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class Productos extends Model {
  static associate(models) {
      //associate
      this.belongsTo(models.Categorias, { foreignKey: 'categoriaId', as: 'categorias' });
  }

  static config(sequelize) {// estatico
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Productos',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCTO_TABLE, productosSchema, Productos }
