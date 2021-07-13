//Base de datos para probar
const db = {
    'user': [
        { id: 1, name: 'Sergio' },
    ]
};

function list(table) {
    return db[table];
}

function get(table, id) {
    let col = list(table);
    //Find te retorna el primero, mientras que si usas filter te retorna todos con la misma condicion
    return col.find(item => item.id == id) || null;
}

//Actualizar e insertar
function upsert(table, data) {
    db[collection].push(data);
}

//Eliminar datos
function remove(table, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove
};