const { Op } = require('sequelize');
const client = require('../config/database');
const db = require('../models');
const fs = require('fs');

const eventController = {
    get : (req, res) => {
        const today = new Date();
        client.query('SELECT * FROM events WHERE date_debut > $1 ORDER BY date_debut;', [today], (err, result) => {
            if(err) {
                console.log(err.stack)
                res.send('Erreur de requête');
            }
            else{
                res.render('events', {events: result.rows});
            }
        });
    },
    getAll : async (req, res) => {
        try{
            const {id_categorie, date_debut, date_fin, terme } = req.query;

            const filters = {};

            if(id_categorie){
                filters.id_categorie = id_categorie;
            };

            if(date_debut && date_fin){
                filters.date_debut = {[Op.between] : [date_debut, date_fin]};
            } else if (date_debut) {
                filters.date_debut = {[Op.gte]: date_debut};
            } else if (date_fin) {
                filters.date_fin = {[Op.lte]: date_fin};
            };

            if (terme) {
                filters[Op.or] = [
                    { name : { [Op.iLike]: `%${terme}%` } },
                    { description : { [Op.iLike]: `%${terme}%` } },
                ];
            };

            console.log(filters);
            
            const result = await db.event.findAll({
                where: filters,
                order: [['date_debut', 'ASC']]
            })
            res.json(result);
            // res.render('events_archives', {events: result});
        } catch (err) {
            console.error(`Erreur lors de la récupération des événements :`, err);
            res.status(500).json({error: `Une erreur est servenue lors de la récupération des données.`, details: err.message});
        };
    },
    getById : (req, res) => {
        const id = +req.params.id;
        client.query('SELECT * FROM events WHERE id = $1', [id], (err, result) => {
            if(err){
                console.log(err.stack);
                res.send('Erreur de requête');
            }
            else{
                if(result.rows.length > 0){
                    const event = result.rows[0];
                    client.query('SELECT * FROM inscriptions WHERE id_event = $1', [id], (err, resultCount) => {
                        if(err){
                            res.render('events_details', {event, placeRest: 'Erreur du calcul de places restantes'});
                        }
                        else{
                            res.render('events_details', {event, placeRest: event.places_count - resultCount.rowCount});
                        }
                    });
                }
                else{
                    res.send('Event non trouvé');
                }
            }
        });
    },
    addEvent : async (req, res) => {
        const {name, description, places_count, id_categorie, id_format, image, date_debut, date_fin, annulation, id_createur} = req.body;
        const event = await db.event.findOne({where: {
            name,
            id_categorie,
            date_debut
        }});

        if(!event) {
            const data = await db.event.create({name, description, places_count, id_categorie, id_format, image: req.file.filename, date_debut, date_fin, annulation, id_createur});
            res.status(201).json(data.toJSON());
        }
        else{
            fs.unlinkSync(__dirname+'/../public/images/'+req.file.filename);
            res.status(400).json({error: 'Cet event a déjà été créé'});
        }
    },
};

module.exports = eventController;