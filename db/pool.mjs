import Pool from 'pg';

const pool = new Pool.Pool({
  user: process.env.RDS_USERNAME,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
});

export function asdf() {
  return pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

export function qwer() {
  console.log('qwer');
};
