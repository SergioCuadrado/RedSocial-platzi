//Tiene acceso a la parte de almacenamiento de datos
//Para generar id's
const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = (injectedStore, injectedCache) => {
    if(!injectedStore) {
        injectedStore = require('../../../store/dummy');
    }

    if(!injectedCache) {
        injectedCache = require('../../../store/dummy');
    }

    async function list() {
        let users = await injectedCache.list(TABLA);
        if(!users) {
            console.log('No estaba en cache. Buscando en DB');
            users = await injectedStore.list(TABLA);
            injectedCache.upsert(TABLA, users);
        }else {
            console.log('Nos traemos datos de cache');
        }
        return users;
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
        list,
        get: (id) => injectedStore.list(TABLA, id),
        upsert,
        follow,
        following
    };
};