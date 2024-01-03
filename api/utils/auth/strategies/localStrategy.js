const { Strategy } = require('passport-local');

const AuthServices = require('./../../../services/authService');
const service = new AuthServices();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  async (email, password, done) => {
    try {
      const usuario = await service.getUser(email, password);
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = localStrategy;
