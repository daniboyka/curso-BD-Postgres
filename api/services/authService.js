const { boom } = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const userService = require('./userServices');
const service = new userService();

class AuthServices {
  async getUser(email, password) {
    const usuario = await service.findByEmail(email);
    if (!usuario) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete usuario.dataValues.password;
    return usuario;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload ={ sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovey?token=${token}`
    await service.modificar(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      html: `<b>Ingresa a este Link => ${link}</b>`, // html body
    };
   const rta = await this.sendMail(mail);
   return rta
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.modificar(user.id, {recoveryToken: null, password: hash});
      return { message: 'la contraseña fue cambiada' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail enviado' };
  }
}

module.exports = AuthServices;
