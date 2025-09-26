const pool = require('./pool');
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "fopuy",
  database: "uploader",
  password: "Tobirama106848!",
  port: 5432
});

async function ensureDatabaseExists(){
    const dBname = 'uploader';
    const checker = await pool.query("SELECT 1 FROM pg_database WHERE datname= $1", [dBname])

    if (checker.rowCount ===0){
        await pool.query("CREATE DATABASE $1", [dBname]);
        console.log(`Database ${dBname} created`);
    } else {
        console.log(`Database ${dBname} already exists`);
    }
}

module.exports = { ensureDatabaseExists };