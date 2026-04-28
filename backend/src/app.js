const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const userRoutes = require('./routes/userRoutes');
const { corsOrigin } = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
