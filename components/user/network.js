// Se podria llamar routes el fichero
const express = require('express');

const response = require('../../network/response');
const controller = require('./controller');

const router = express();

router.get('/', function(req, res) {
    const lista = controller.list();
    response.success(req, res, lista, 200);
});

module.exports = router;