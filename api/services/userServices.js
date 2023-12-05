const { faker } = require('@faker-js/faker');
const getConnection = require('../libs/postgres');
const pool = require('../libs/postgresPool');

class userServices {
  constructor() {
    this.usuarios = [];
    this.generate();
    this.pool = pool
    this.pool.on('error', (err) => console.error(err))
  }

  generate() {
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
  const query = 'SELECT * FROM tasks';
  const respuesta = await this.pool.query(query)
  return respuesta.rows;
  }

  findOne(id) {
    return this.usuarios.find((persona) => persona.id === id);
  }

  create(data) {
    const newUsuario = {
      id: faker.string.uuid(),
      ...data,
    };
    this.usuarios.push(newUsuario);
    return newUsuario;
  }

  modificar(id, modificacion) {
    const index = this.usuarios.findIndex((persona) => persona.id === id);
    if (index === -1) {
      throw new Error('usuario no encontrado');
    }
    const current = this.usuarios[index];
    this.usuarios[index] = {
      ...current,
      ...modificacion,
    };
    return this.usuarios[index];
  }
}

module.exports = userServices;
