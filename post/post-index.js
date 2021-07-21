const express = require('express');

const config = require('../config.js');
const post = require('./components/post/post-network');
const errors = require('../network/errors');

const app = express();

//Recibir informacion desde el cliente con estas 2 lineas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routing
app.use('/api/post', post);
app.use(errors);

app.listen(config.post.port, () => {
    console.log(`Servicio posts escuchando en el puerto ${ config.post.port }`);
});