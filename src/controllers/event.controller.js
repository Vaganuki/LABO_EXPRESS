const { Op, where } = require('sequelize');
const db = require('../models');
const fs = require('fs');

const eventController = {
	getAll: async (req, res) => {
		try {
			const { page = 1, limit = 15 } = req.query;
			const offset = (+page - 1) * +limit;

			const events = await db.event.findAll({
				where: { date_debut: { [Op.gte]: new Date() } },
				limit: limit,
				offset: offset,
				order: [['date_debut', 'ASC']]
			});

			if (events) {
				res.status(200).json({ events: events });
			}
			else {
				res.status(404).json({ error: `Not found` });
			}
		} catch (err) {
			console.error(`Erreur lors de la récupération des événements :`, err);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
		};
	},
	getArchive: async (req, res) => {
		try {
			const { id_categorie, id_format, date_debut, date_fin, terme } = req.query;

			const filters = {};

			if (id_categorie) {
				filters.id_categorie = id_categorie;
			};

			if (id_format) {
				filters.id_format = id_format;
			};

			if (date_debut && date_fin) {
				filters.date_debut = { [Op.between]: [date_debut, date_fin] };
			} else if (date_debut) {
				filters.date_debut = { [Op.gte]: date_debut };
			} else if (date_fin) {
				filters.date_fin = { [Op.lte]: date_fin };
			};

			if (terme) {
				filters[Op.or] = [
					{ name: { [Op.iLike]: `%${terme}%` } },
					{ description: { [Op.iLike]: `%${terme}%` } },
				];
			};
			const result = await db.event.findAll({
				where: filters,
				order: [['date_debut', 'ASC']]
			})
			res.status(200).json({ events: result });
		} catch (err) {
			console.error(`Erreur lors de la récupération des événements :`, err);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
		};
	},
	getById: async (req, res) => {
		try {
			const id = +req.params.id;
			const event = await db.event.findOne({
				where: {id},
				include:[
					db.inscription,
					db.format,
					db.categorie
				]
			});
			console.log();
			console.log();
			console.log(event);
			console.log();
			console.log();
			if (event) {
				res.status(200).json({ event: event, place_restante: event.places_count - event.inscriptions.length, format: event.format.name, categorie: event.categorie.name });
			}
			else {
				res.status(404).json({ error: `Not found` });
			}
		} catch (err) {
			console.error(`Erreur lors de la récupération des événements :`, err);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
		};
	},
	addEvent: async (req, res) => {
		try {
			const { name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation } = req.body;
			const event = await db.event.findOne({
				where: {
					name,
					id_categorie,
					date_debut
				}
			});
			const user = await db.user.findOne({ where: { id: req.user.id } });
			const image = req.file ? req.file.filename : null;
			if (!event && user) {
				const data = await db.event.create({ name, description, places_count, id_categorie, id_format, image, date_debut, date_fin, annulation, id_createur: req.user.id });
				res.status(201).json(data.toJSON());
			}
			else {
				if (image != null) {
					fs.unlinkSync(__dirname + '/../public/images/' + req.file.filename);
				}
				if (!user) {
					res.status(400).json({ error: `L'user n'a pas été créé` });
				}
				else {
					res.status(400).json({ error: 'Cet event a déjà été créé' });
				}
			}
		} catch (err) {
			if (image != null) {
				fs.unlinkSync(__dirname + '/../public/images/' + req.file.filename);
			}
			console.error(`Erreur lors de la récupération des événements :`, err);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
		};
	},
	update: async (req, res) => {
		let event = null;
		try {
			const id = +req.params.id;
			event = await db.event.findOne({ where: { id } });

		} catch (err) {
			console.error(`Erreur lors de la récupération des événements :`, err);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
			return;
		};

		if (event) {
			if (event.id_createur === req.user.id) {
				const { name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation } = req.body;
				db.event.update({ name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation }, { where: { id } });
				res.status(200).json(event.toJSON());
			}
			else {
				res.status(401).json({ error: `Wrong user` })
			}
		}
		else {
			res.status(404).json({ error: `Event inexistant` });
		}
	},
	inscription: async (req, res) => {
		try {

			const user = await db.user.findOne({ where: { id: req.user.id } });

			if (!user) {
				res.status(400).json({ error: `L'user n'existe pas` });
				return;
			}

			const id_event = +req.params.id;
			const id_user = req.user.id;
			const event = await db.event.findOne({ where: { id: id_event } });
			if (event) {
				const result = await db.inscription.count({
					where:
						id_event,
					id_user
				});

				const encoreLibre = event.places_count <= result ? false : true;
				if (encoreLibre) {
					const inscriptionExiste = await db.inscription.findOne({
						where: {
							id_event,
							id_user
						}
					});
					if (!inscriptionExiste) {
						db.inscription.create({ id_event, id_user });
						res.status(200).json('Inscription réussie')
					}
					else {
						res.status(409).json({ Error: `L'inscription a déjà été réalisée` });
					}
				}
				else {
					res.status(409).json({ Error: `Plus aucune place libre dans l'event` })
				}
			}
			else {
				res.status(404).json({ error: `Event inexistant` });
			}
		}
		catch (error) {
			console.error(`Erreur lors de la récupération des événements :`, error);
			res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: error.message });
		}
	}
};

module.exports = eventController;