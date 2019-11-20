'use strict';

const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const morgan = require('morgan');

const PORT = 3000;

const userRoute = require('./api/routes/user');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/users', userRoute);

app.get('/', (req, res, next) => {
  res.status(200).json({
    info: 'Node.js, Express, and Postgres API'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

