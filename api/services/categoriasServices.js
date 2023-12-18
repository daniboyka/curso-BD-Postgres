const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class categoriaServices {
  constructor() {
    this.cliente = [];
  }

  //con include[] podemos anidar toda la iformacion del modelo usuarion, tiene que estar relacionado(asociados)

  async find() {
    const respuesta = await models.Categorias.findAll()
    return respuesta;
  }

  async findOne(id) {
    const categoria = await models.Categorias.findByPk(id, {
      include:['producto']
    })
    if (!categoria) {
      throw boom.notFound('categoria no encontrado');
    }
    if (categoria.isBlock) {
      throw boom.conflict('categoria is block');
    }
    return categoria;
  }

  async create(data) {
    // const nuevoProducto = await models.User.create(data.user);// voy a crear primero el usuario
    const nuevoCategoria = await models.Categorias.create(data)
    return nuevoCategoria;
  }

  async delete(id) {
    const categoria = await this.findOne(id)
    await categoria.destroy()
    return {message:`La categoria con id ${id} fue eliminado con exito`};
  }

  async modificar(id, modificacion) {
    const categoria = await this.findOne(id)
    const respuesta = await categoria.update(modificacion)
    return respuesta
  }
}

module.exports = categoriaServices;
