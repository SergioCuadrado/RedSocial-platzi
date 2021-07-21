module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    post: {
        port: process.env.POST_PORT || 3002
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'hosting',
        user: process.env.MYSQL_USER || 'user_hosting',
        password: process.env.MYSQL_PASS || 'password_hosting',
        database: process.env.MYSQL_DB || 'database',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port:  process.env.MYSQL_SRV_PORT || 3001
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port:  process.env.MYSQL_SRV_PORT || 3003
    },
    redis: {
        host: process.env.REDIS_HOST || 'cache_redis',
        port: process.env.REDIS_PORT || 11480,
        password: process.env.REDIS_PASS || 'password_redis'
    }
};
