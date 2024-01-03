const bcrypt = require('bcrypt');

const verifyPassword = async () => {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$eq3F4et1mA3fqdgTTnBg5eyCqAWIJHiCfE0hz3xoES8SDSpdVICcS';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch)
};

verifyPassword();
