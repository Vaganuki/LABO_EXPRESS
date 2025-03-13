const eventBuilder = require('./event.model');
const userBuilder = require('./user.model');
const categorieBuilder = require('./categorie.model');
const formatBuilder = require('./format.model');
const inscriptionBuilder = require('./inscription.model');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
    
);

const db = {
    sequelize,
    event: eventBuilder(sequelize),
    user: userBuilder(sequelize),
    categorie: categorieBuilder(sequelize),
    format: formatBuilder(sequelize),
    inscription: inscriptionBuilder(sequelize),
};

module.exports = db;