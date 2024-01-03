const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure:true,
  port: 465,
  auth: {
      user: 'danielcaz@gmail.com',
      pass: 'gozd lyus waap ifun'
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'danielcaz@gmail.com', // sender address
    to: "daniel_3171@hotmail.com", // list of receivers
    subject: "este es un nuevo correo ✔", // Subject line
    text: "Hello dani?", // plain text body
    html: "<b>Hello dani?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMain();
