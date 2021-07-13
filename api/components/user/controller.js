//Tiene acceso a la parte de almacenamiento de datos
//Para generar id's
const nanoid = require('nanoid');

const TABLA = 'user';

module.exports = (injectedStore) => {
    if(!injectedStore) {
        injectedStore = require('../../../store/dummy');
    }

    /* function list() {
        return injectedStore.list(TABLA);
    }

    function get(id) {
        return injectedStore.list(TABLA, id);
    }

    return {
        list,
        get
    } */
    return {
        list: () => injectedStore.list(TABLA),
        get: (id) => injectedStore.list(TABLA, id),
        upsert: (body) => {
            const user = {
                name: body.name
            };
            if(body.id) {
                user.id = body.id;
            } else {
                user.id = nanoid();
            }
            injectedStore.upsert(TABLA, user);
        }
    };
}