const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const payload = { name: 'Lee Yejun' };
const token = jwt.sign(payload, process.env.JWT_SECRET);
console.log(payload);
console.log(token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
