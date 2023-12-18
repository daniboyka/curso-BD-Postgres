const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
// const pool = require('../libs/postgresPool');
const { models } = require('../libs/sequelize');

class ProductosServices {
  constructor() {
    this.productos = [];
    this.generate();
    // this.pool = pool
    // this.pool.on('error', (err) => console.error(err))
  }

  async generate() {
    // const limit = size > 100 ? 100 : size || 10; //si size es mayor a 100 no mas me va a traer 100 asi no saturo mi servidor
    const limit = 100;
    for (let i = 0; i < limit; i++)
      this.productos.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean()
      });
  }
  //con include[] podemos anidar toda la iformacion del modelo usuarion, tiene que estar relacionado(asociados)

  async find() {
    const respuesta = await models.Productos.findAll({
      include:['categorias']
    })
    //   include:['categoria']// aca podemos anidar, (osea hacer como un concatener datos) de los modelos que tenemos relacionados(asociados)
    // });
    return respuesta;
  }

  async findOne(id) {
    const producto = await models.Customer.findByPk(id);
    if (!producto) {
      throw boom.notFound('producto no encontrado');
    }
    if(producto.isBlock){
      throw boom.conflict('producto is block');
    }
    return producto;
  }

  async create(data) {
    const newProducto = await models.Productos.create(data)
    return newProducto;
  }



  async modificar(id, modificacion) {
    const producto = await this.findOne(id)
    const respuesta = await producto.update(modificacion)
    return respuesta
    }

  async delete(id) {
    const producto = await this.findOne(id)
    await producto.destroy()
    return {message:`El producto con id ${id} fue eliminado con exito`};
  }
}

module.exports = ProductosServices;
