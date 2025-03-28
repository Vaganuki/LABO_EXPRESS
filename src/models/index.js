const eventBuilder = require('./event.model');
const userBuilder = require('./user.model');
const categorieBuilder = require('./categorie.model');
const formatBuilder = require('./format.model');
const inscriptionBuilder = require('./inscription.model');
const { Sequelize } = require('sequelize');

//Définition de Sequelize

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

// Création de la DB

const db = {
	sequelize,
	event: eventBuilder(sequelize),
	user: userBuilder(sequelize),
	categorie: categorieBuilder(sequelize),
	format: formatBuilder(sequelize),
	inscription: inscriptionBuilder(sequelize),
};

//event associate

db.event.hasMany(db.inscription, {
	foreignKey: 'id_event',
});

db.event.belongsTo(db.categorie, {
	foreignKey: 'id_categorie',
});

db.event.belongsTo(db.format, {
	foreignKey: 'id_format',
});

//Format associate

db.format.hasMany(db.event, {
	foreignKey: 'id_format',
});

// Inscription associate

db.inscription.belongsTo(db.event, {
	foreignKey: 'id_event',
});

db.inscription.belongsTo(db.user, {
	foreignKey: 'id_user',
});

// User associate

db.user.hasMany(db.inscription, {
	foreignKey: 'id_user'
});

// Categorie associate

db.categorie.hasMany(db.event, {
	foreignKey: 'id_categorie',
});

console.log('DB models & associations loaded! 💅✨');

module.exports = db;