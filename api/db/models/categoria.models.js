const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIA_TABLE = 'categoria';

const categoriaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Categorias extends Model {
  static associate(models) {
      //associate
      this.hasMany(models.Productos, {as: 'producto',
    foreignKey: 'categoriaId',
    });
  }

  static config(sequelize) {// estatico
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categorias',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORIA_TABLE, categoriaSchema, Categorias }
