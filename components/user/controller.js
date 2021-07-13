//Tiene acceso a la parte de almacenamiento de datos
const store = require('../../store/dummy');

const TABLA = 'user';

function list() {
    return store.list(TABLA);
}

module.exports = {
    list
};