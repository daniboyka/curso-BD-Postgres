const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/index');// atento a esto!!!!!!!!!!!!!!!!!!!!!!

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

// sequelize.sync();// esta es la funcion que crea las tablas 1°lee los modelos y dsp crea las tablas, la eliminamos para que las tablas nuevas ka creemos por migraciones

module.exports = sequelize;
