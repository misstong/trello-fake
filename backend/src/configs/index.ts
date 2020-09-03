const databaseConfig = require('./database.json')
const path = require('path')

interface IDatabaseConfig {
    username: string,
    password: string | null,
    database: string,
    host: string,
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
    timezone: string
}

const configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.development as IDatabaseConfig,
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.test as IDatabaseConfig,
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.production as IDatabaseConfig,
        storage: {
            dir: path.resolve(__dirname, '../attachments'),
            prefix: '/public/attachments'
        }
    }
}

type configs = typeof configs;
type configKeys = keyof configs;

const NODE_ENV = process.env.NODE_ENV as configKeys || 'development';

export default configs[NODE_ENV];