'use strict'

const db = require('../../db');

const requestLogging = (type, uri) => ({
  type,
  url: uri
});

exports.getAll = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    console.table(rows);
    const responce = rows.map(record => ({
      id: record.id,
      name: record.name,
      email: record.email,
      request: requestLogging('GET', `http://localhost:3000/users/${record.id}`)
    }))
    res.status(200).json({ responce });
  } catch(error) {
    res.status(400).json({ error });
  }
};

exports.getOne = async (req, res, next) => {
  const { id } = req.params;
  if (!parseInt(id)) res.status(400).json({error: 'You haven\'t transmitted a correct id'});
  try{
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!rows.length) return res.status(404).json({error: 'No record has a received id'} )
    console.table(rows);
    console.log(rows);
    res.status(200).json({ 
      data: rows[0],
      request: requestLogging('GET', `http://localhost:3000/users/${id}`)
    });
  } catch(e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
};

exports.changeOne = async (req, res, next) => {
  const {id} = req.params;
  if (!parseInt(id)) res.status(400).json({error: 'You haven\'t transmitted a correct id'});
  const { name, email } = req.body;
  try{
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]); //redundancy mb
    if (!rows.length) return res.status(404).json({error: 'No record has a received id'} )
    const result = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3;', [name, email, id])
    
    res.status(201).json({ 
      data: 'User updated',
      request: requestLogging('PUT', `http://localhost:3000/users/${id}`)
    });
  } catch(e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
}

exports.addOne = async (req, res, next) => {
  const { name, email } = req.body;
  try {
  const {rows} = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;', [name, email]);
  const {id} = rows[0];
  res.status(201).json({ 
    data: 'User added',
    request: requestLogging('POST', `http://localhost:3000/users/${id}`)
  });
  } catch(e) {
  console.log(e);
  res.status(404).json({ error: e });
  }
};

exports.deleteOne = async (req, res, next) => {
  const {id} = req.params;
  if (!parseInt(id)) res.status(400).json({error: 'You haven\'t transmitted a correct id'});
  try {
    const {rowCount} = await db.query('DELETE FROM users WHERE id = $1', [id]);
    if (!rowCount) res.status(400).json({
      error: `User with received id('${id}') not found`
    })
    res.status(200).json({ 
      data: 'User deleted',
      request: requestLogging('DELETE', `http://localhost:3000/users`)
    });
  } catch(err) {
    console.log(error);
    res.status(404).json({ error: err });
  }
};
