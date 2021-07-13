//Tiene acceso a la parte de almacenamiento de datos
//Para generar id's
const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = (injectedStore) => {
    if(!injectedStore) {
        injectedStore = require('../../../store/dummy');
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username
        };
        if(body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            });
        }

        return injectedStore.upsert(TABLA, user);
    }

    return {
        list: () => injectedStore.list(TABLA),
        get: (id) => injectedStore.list(TABLA, id),
        upsert
    };
};