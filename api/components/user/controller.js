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

    function follow(from, to) {
        return injectedStore.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to
        });
    }

    async function following(user) {
        const join = {};
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		
		return await injectedStore.query(TABLA + '_follow', query, join);
    }

    return {
        list: () => injectedStore.list(TABLA),
        get: (id) => injectedStore.list(TABLA, id),
        upsert,
        follow,
        following
    };
};