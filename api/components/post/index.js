const store = require('../../../store/mysql');
const ctrl = require('./post-controller');

module.exports = ctrl(store);