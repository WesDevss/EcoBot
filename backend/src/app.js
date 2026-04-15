const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { corsOrigin } = require('./config/env');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use('/api', routes);

module.exports = app;
