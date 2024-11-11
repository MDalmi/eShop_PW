
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction){
    pool = new Pool({
        connectionString : process.env.DATABASE_URL,
        ssl : {
            rejectUnauthorized : false
        }
    })
} else {
    pool = new Pool({
        user : 'db_trabalhopw_user',
        password : 'xuFn46HFzC6uewwG4AKWGiRqhhCfYg1T',
        database : 'db_trabalhopw',
        host : 'dpg-csb5i5d6l47c73f89nqg-a.oregon-postgres.render.com',
        port : 5432
    }
    )
}

module.exports = { pool }
