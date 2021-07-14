const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = (injectedStore) => {
    if(!injectedStore) {
        injectedStore = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await injectedStore.query(TABLA, { username: username });
        //Comparando contraseña
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if(sonIguales === true) {
                    //Generate token
                    return auth.sign(data);
                } else {
                    throw new Error('Información invalida');
                }
            });

        
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        };
        if(data.username) {
            authData.username = data.username;
        }
        if(data.password) {
            //Cifrando la contraseña, en numero 5 es la veces que se ejecuta el algoritmo, mas alto mejor cifrado pero tarda mas.
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return injectedStore.upsert(TABLA, authData);
    }

    return {
        upsert,
        login
    };
};