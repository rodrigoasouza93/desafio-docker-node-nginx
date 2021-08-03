const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'desafionode'
};

const connection = mysql.createConnection(config);
let people;

connection.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  const createPeople = `CREATE TABLE IF NOT EXISTS people (
    id INT primary key AUTO_INCREMENT,
    name VARCHAR(255) not null
  );`;
  connection.query(createPeople);

  const sql = `INSERT INTO people(name) values('Rodrigo');`
  connection.query(sql);

  connection.query('SELECT * FROM people;', function (error, results, fields) {
    if (error) throw error;
    people = results;
  });

  connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

app.get('/', (req, res) => {
  let html = '<h1>Full Cycle Rocks!</h1>';
  html += '<ul>'
  people.forEach(person => {
    console.log(person.name)
    html += `<li>${person.name}</li>`
  });
  html += '</ul>'
  res.send(html)
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})