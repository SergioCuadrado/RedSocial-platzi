const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const auth = require('./components/auth/auth-network');
const post = require('./components/post/post-network');
const user = require('./components/user/network');
const errors = require('../network/errors');

const app = express();

//Recibir informacion desde el cliente con estas 2 lineas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require('./swagger.json');
//Routing
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
//Toda la documentacion del API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(errors);

app.listen(config.api.port, () => {
    console.log(`API escuchando en el puerto ${ config.api.port }`);
});