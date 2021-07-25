import Pool from 'pg';

import dbconnectionconfig from './config.mjs';

const config = dbconnectionconfig.config;
const createTableQuery = "CREATE TABLE IF NOT EXISTS urls (id bigserial PRIMARY KEY, " + 
                         "shortened_url TEXT NOT NULL, original_url TEXT NOT NULL);";
const createShortCodeIndexQuery = "CREATE INDEX IF NOT EXISTS short_url ON urls(shortened_url)";

const pool = new Pool.Pool({
  user: config.username,
  host: config.hostname,
  database: config.dbname,
  password: config.password,
  port: config.port
});

try {
  const res = await pool.query(createTableQuery);
  console.log(res);
  
  const res2 = await pool.query(createShortCodeIndexQuery);
  console.log(res2);

} catch (err) {
  console.log(err);
} finally {
  console.log('success');
  pool.end();
}
