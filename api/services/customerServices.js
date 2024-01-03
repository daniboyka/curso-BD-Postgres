const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class customerServices {
  constructor() {
    this.cliente = [];
  }

  //con include[] podemos anidar toda la iformacion del modelo usuarion, tiene que estar relacionado(asociados)

  async find() {
    const respuesta = await models.Customer.findAll({
      include:['user']// aca podemos anidar, (osea hacer como un concatener datos) de los modelos que tenemos relacionados(asociados)
    });
    return respuesta;
  }

  async findOne(id) {
    const cliente = await models.Customer.findByPk(id);
    if (!cliente) {
      throw boom.notFound('cliente no encontrado');
    }
    if (cliente.isBlock) {
      throw boom.conflict('cliente is block');
    }
    return cliente;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const nuevoUsuario ={
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    };// voy a crear primero el usuario
    const nuevoCliente = await models.Customer.create(nuevoUsuario, {
      include:['user']
    })
    delete nuevoCliente.user.dataValues.password;
    return nuevoCliente;
  }

  async delete(id) {
    const cliente = await this.findOne(id)
    await cliente.destroy()
    return {message:`El cliente con id ${id} fue eliminado con exito`};
  }

  async modificar(id, modificacion) {
    const cliente = await this.findOne(id)
    const respuesta = await cliente.update(modificacion)
    return respuesta
  }
}

module.exports = customerServices;
