const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
    host: config.redis.host ,
    port: config.redis.port ,
    password: config.redis.password
});

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);

            let res = data || null;
            if(data) {
                res = JSON.parse(data);
            }
            resolve(res);
        });
    });
}

function get(table, id) {
    const search = `${table}_${id}`;
    return list(search);
}

async function upsert(table, data) {
    let key = table;
    if(data && data.id) {
        key = key + '_' + data.id;
    }

    // El numero 10 en el tiempo que lo guarda, despues de 10 segundos se expira la informacion en la cache
    client.setex(key, 10, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get, 
    upsert
};