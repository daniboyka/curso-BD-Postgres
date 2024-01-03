const jwt = require('jsonwebtoken')

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjb3N0dW1lciIsImlhdCI6MTcwMzgyMTY2Mn0.RliJn99CkVvRqOyvTE2H4dmpaqsEETAE73AlyaZS4KM'


const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload)
