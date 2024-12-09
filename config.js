
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction) {
    pool = new Pool({
        min: 0,
        max: 10,
        createTimeoutMillis: 8000,
        acquireTimeoutMillis: 8000,
        idleTimeoutMillis: 8000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
} else {
    pool = new Pool({
        user: 'postgres',
        password: 'postgres',
        database: 'testePW',
        host: 'localhost',
        port: 5432
    }
    )
}

module.exports = { pool }
