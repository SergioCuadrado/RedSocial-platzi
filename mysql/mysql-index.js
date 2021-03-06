const express = require('express');
const config = require('../config');
const router = require('./network');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/', router);



app.listen(config.mysqlService.port, () => {
    console.log(`Servicio de mySql escuchando en el puerto ${ config.mysqlService.port }`);
});