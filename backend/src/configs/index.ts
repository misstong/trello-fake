const databaseConfig = require('./database.json')

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
        database: databaseConfig as IDatabaseConfig
    },
    test: {
        server: {
            host: 'localhost',
            port: 8080
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        }
    }
}

type configs = typeof configs;
type configKeys = keyof configs;

const NODE_ENV = process.env.NODE_ENV as configKeys || 'development';

export default configs[NODE_ENV];