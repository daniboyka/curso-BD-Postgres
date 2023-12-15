const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');
// const pool = require('../libs/postgresPool');
const { models } = require('./../libs/sequelize');

class userServices {
  constructor() {
    this.usuarios = [];
    this.generate();
  }

  async generate() {
    // const limit = size > 100 ? 100 : size || 10; //si size es mayor a 100 no mas me va a traer 100 asi no saturo mi servidor
    const limit = 100;
    for (let i = 0; i < limit; i++)
      this.usuarios.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
      });
  }

  async find() {
    const respuesta = await models.User.findAll({
      include:['customer']
    });
    return respuesta;
  }

  async findOne(id) {
    // const usuario = this.usuarios.find((persona) => persona.id === id);
    const usuario = await models.User.findByPk(id);
    if (!usuario) {
      throw boom.notFound('Usuario no encontrado');
    }
    if (usuario.isBlock) {
      throw boom.conflict('Usuario is block');
    }
    return usuario;
  }

  async create(data) {
    const nuevoUsuario = await models.User.create(data);
    return nuevoUsuario;
  }

  async delete(id) {
    // const usuario = await models.User.findByPk(id); ----> esto se puede hacer asi pero uso la funcion findOne para no repetir codigo y ya tiro el error si no existe
    const usuario = await this.findOne(id)
    await usuario.destroy()
    return {message:`El usuario con id ${id} fue eliminado con exito`};
  }

  async modificar(id, modificacion) {
    // const usuario = await models.User.findByPk(id);----> esto se puede hacer asi pero uso la funcion findOne para no repetir codigo y ya tiro el error si no existe
    const usuario = await this.findOne(id)
    const respuesta = await usuario.update(modificacion)
    return respuesta
    /////////////////// antes de usar model de postgres y usabamos array en memoria:
    // const index = this.usuarios.findIndex((persona) => persona.id === id);
    // if (index === -1) {
    //   throw new Error('usuario no encontrado');
    // }
    // const current = this.usuarios[index];
    // this.usuarios[index] = {
    //   ...current,
    //   ...modificacion,
    // };
    // return this.usuarios[index];
  }
}

module.exports = userServices;
