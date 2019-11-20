'use strict';

const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'Isco222000',
  host: 'localhost',
  port: 5432,
  database: 'initial'
});

client.connect()
  .then(() => console.log({ message: 'Client connected' }))
  .then(() => client.query('SELECT * FROM person'))
  .then(results => console.table(results.rows))
  .catch(err => console.error(err))
  .finally(() => {
    console.log({ message: 'Client disconnected' });
    client.end();
  });

/*

const {Pool} = require('pg');
const pool = new Pool({
  user: "postgres",
  password: "Isco222000",
  host: "localhost",
  port: 5432,
  database: "initial"
});

pool.query("SELECT * FROM person",
(error, result) => { console.table(result.rows)});
*/
