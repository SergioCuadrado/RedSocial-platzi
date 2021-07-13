//Base de datos para probar
const db = {
    'user': [
        { id: '1', name: 'Sergio' },
    ]
};

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let col = await list(table);
    //Find te retorna el primero, mientras que si usas filter te retorna todos con la misma condicion
    return col.find(item => item.id == id) || null;
}

//Actualizar e insertar
async function upsert(table, data) {
    if(!db[table]) {
        db[table] = [];
    }

    db[table].push(data);

    console.log(db);
}

//Eliminar datos
async function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
};