const { Op, where } = require('sequelize');
const client = require('../config/database');
const db = require('../models');
const fs = require('fs');

const eventController = {
    get : (req, res) => {
        const today = new Date();

        client.query('SELECT * FROM events WHERE date_debut > $1 ORDER BY date_debut;', [today], (err, result) => {
            if(err) {
                res.status(400).json({Erreur: `Erreyr de requête`}).send('Erreur de requête');
            }
            else{
                // res.render('events', {events: result.rows});
                res.status(200).json({events: result.rows});
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
            
            const result = await db.event.findAll({
                where: filters,
                order: [['date_debut', 'ASC']]
            })
            res.status(200).json(result);
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
                res.status(400).json({Erreur: `Erreur de requête`}).send('Erreur de requête');
            }
            else{
                if(result.rows.length > 0){
                    const event = result.rows[0];
                    client.query('SELECT * FROM inscriptions WHERE id_event = $1', [id], (err, resultCount) => {
                        if(err){
                            // res.render('events_details', {event, placeRest: 'Erreur du calcul de places restantes'});
                            res.status(200).json({Event_details: event, place_restante: 'Erreur du calcul de places restantes'})
                        }
                        else{
                            // res.render('events_details', {event, placeRest: event.places_count - resultCount.rowCount});
                            res.status(200).json({Event_details: event, place_restante: event.places_count - resultCount.rowCount})
                        }
                    });
                }
                else{
                    res.status(404).json({Erreur: 'Not found'}).send('Event non trouvé');
                }
            }
        });
    },
    addEvent : async (req, res) => {
        const {name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation} = req.body;
        const event = await db.event.findOne({where: {
            name,
            id_categorie,
            date_debut
        }});
        const image = req.file ? req.file.filename : null;
        if(!event) {
            const data = await db.event.create({name, description, places_count, id_categorie, id_format, image, date_debut, date_fin, annulation, id_createur: req.user.id});
            res.status(201).json(data.toJSON());
        }
        else{
            fs.unlinkSync(__dirname+'/../public/images/'+req.file.filename);
            res.status(400).json({error: 'Cet event a déjà été créé'});
        }
    },
    update : async (req, res) => {
        const id = +req.params.id;
        const event = await db.event.findOne( { where: { id } } );
        if(event){
            if(event.id_createur === req.user.id){
                const {name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation} = req.body;
                db.event.update({name, description, places_count, id_categorie, id_format, date_debut, date_fin, annulation},{where: {id}});
                res.status(200).json(event.toJSON());
            }
            else{
                res.status(401).json({error: `Wrong user`})
            }
        }
        else{
            res.status(404).json({error: `Event inexistant`});
        }
    },
    inscription : async (req, res) => {
        const id_event = +req.params.id;
        const id_user = req.user.id;
        const event = await db.event.findOne( { where: { id : id_event } } );
        if(event){
            const inscriptionExiste = await db.inscription.findOne( { where: {
                id_event,
                id_user
            }});
            if(!inscriptionExiste){
                db.inscription.create({id_event,id_user});
                res.status(200).json('Inscription réussie')
            }
            else{
                res.status(409).json({Error: `L'inscription a déjà été réalisée`});
            }
        }
        else{
            res.status(404).json({error: `Event inexistant`});
        }
    }
};

module.exports = eventController;