
/* const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ from Railway
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
}); */

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

async function addUser([username, email, password]) {
    await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)`,
    [username, email, password]
  );
}

module.exports = pool;