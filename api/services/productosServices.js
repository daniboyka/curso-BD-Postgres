const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
// const pool = require('../libs/postgresPool');
const sequelize = require('../libs/sequelize');

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

  async find() {
      const query = 'SELECT * FROM tasks';
      const [data] = await sequelize.query(query)
      return data;
  }

  async findOne(id) {
    const producto = this.productos.find((item) => item.id === id);
    if (!producto) {
      throw boom.notFound('producto no encontrado');
    }
    if(producto.isBlock){
      throw boom.conflict('producto is block');
    }
    return producto;
  }

  async create(data) {
    const newProducto = {
      id: faker.string.uuid(),
      ...data,
    };
    this.productos.push(newProducto);
    return newProducto;
  }



  async modificar(id, modificacion) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }

    const current = this.productos[index];
    this.productos[index] = {
      ...current,
      ...modificacion,
    };
    return this.productos[index];
  }

  async delete(id) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }
    this.productos.splice(index, 1);
    return { message: `El producto con id ${id} se elimino correctamente` };
  }
}

module.exports = ProductosServices;
