import { environment } from "../../resources/environments";
const { Sequelize, Transaction } = require('sequelize');

const password = environment.get('mysql.password')
const username = environment.get('mysql.username')
const database = environment.get('mysql.database')
const host = environment.get('mysql.host')
const port = environment.get('mysql.port')
const server = environment.get('mysql.server')

export const dbmysql = new Sequelize({
    host: server,
    port: port,
    database: database,
    username: username,
    password: password,
    dialect: 'mysql',
    pool: {
        max: 3,
        min: 0,
    },
    rectry: {
        max: 3,
    },

    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    logging: false
});

async function test() {
    await dbmysql.authenticate()
        .then(() => console.log(" ### -> Successfully connected to database"))
        .catch((err:any) => {
            console.error(" ### -> Could not connect to database", err)
            process.exit()
        });
}

test();