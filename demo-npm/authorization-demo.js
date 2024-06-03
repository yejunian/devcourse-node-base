const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');

dotenv.config();

const expressPort = process.env.EXPRESS_PORT;
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.listen(expressPort);

app.get('/jwt', function (req, res) {
  const payload = { name: 'Lee Yejun' };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '5m' });

  // res.cookie('token', token, { httpOnly: true });
  res.status(200).json({ token });
});

app.get('/jwt/verification', function (req, res) {
  const [authType, token] = req.headers.authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer') {
    return res.status(401).end();
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    return res.status(200).json(payload);
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
});
