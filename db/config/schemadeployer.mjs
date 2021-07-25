import Pool from 'pg';

import dbconnectionconfig from './config.mjs';

const config = dbconnectionconfig.config;

const pool = new Pool.Pool({
  user: config.username,
  host: config.hostname,
  database: config.dbname,
  password: config.password,
  port: config.port
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});
