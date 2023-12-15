const { User, UserSchema } = require('./models/user.models');
const { Customer, customerSchema } = require('./models/customer.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));//QUIERO INICIALIZAR UN (UserSchema) Y SU CONFIGURACION ES (UserSchema)
  Customer.init(customerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
}

module.exports = setupModels;
