const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const message = 'I am user number 3.';
const hash = SHA256(message).toString();

const data = { name: 'john' };
const sign = jwt.sign(data, '123');
console.log(jwt.decode(sign, '123'));