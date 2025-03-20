const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_NAME } = process.env;
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

client.connect()
    .then(() => console.log(`${DB_USER} s'est bien connecté à ${DB_NAME}`))
    .catch(err => console.log(`Erreur lors de la tentativde de connexion à ${DB_NAME}`, err.stack));

module.exports = client;