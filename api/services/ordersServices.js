const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class orderServices {
  constructor() {
    this.cliente = [];
  }

  //con include[] podemos anidar toda la iformacion del modelo usuarion, tiene que estar relacionado(asociados)

  async find() {
    const respuesta = await models.Order.findAll({
      include:['Customer']
    });
    return respuesta;
  }

  async findByUser(userId) {
    const ordenes = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }
    ]
    });
    return ordenes;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      },
    'items'
    ]
    });
    if (!order) {
      throw boom.notFound('cliente no encontrado');
    }
    if (order.isBlock) {
      throw boom.conflict('cliente is block');
    }
    return order;
  }

  async create(data) {
    const costumer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
      if(!costumer){
        throw boom.badRequest('Customer not found');
      }else{
        const newOrder = await models.Order.create({
          customerId: costumer.id});
          return newOrder;
      }
    };
  //   const nuevaOrder = await models.Order.create(data);
  //   return nuevaOrder;
  // }

  async addItem(data) {
    const nuevaItem = await models.OrderProducto.create(data);
    return nuevaItem;
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

module.exports = orderServices;
