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


// need to get an array [{propName: 'prop1', value: 'new value'}, ... , {propNameN: 'propN', value: 'new value'}]
exports.changeOne = async (req, res, next) => {
  const {id} = req.params;
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
}