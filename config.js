module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql4.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql4425254',
        password: process.env.MYSQL_PASS || 'Nj1kTtLwfS',
        database: process.env.MYSQL_DB || 'sql4425254',
    }
};