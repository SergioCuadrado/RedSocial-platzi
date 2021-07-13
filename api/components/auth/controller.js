const TABLA = 'auth';

module.exports = (injectedStore) => {
    if(!injectedStore) {
        injectedStore = require('../../../store/dummy');
    }

    function upsert(data) {
        const authData = {
            id: data.id,
        };
        if(data.username) {
            authData.username = data.username;
        }
        if(data.password) {
            authData.password = data.password;
        }
        return injectedStore.upsert(TABLA, authData);
    }

    return {
        upsert
    };
};