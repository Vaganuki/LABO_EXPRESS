const client = require('../config/database');

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
    getAll : (req, res) => {
        client.query('SELECT * FROM events ORDER BY date_fin DESC;', (err, result) => {
            if(err) {
                console.log(err.stack)
                res.send('Erreur de requête');
            }
            else{
                res.render('events_archives', {events: result.rows});
            }
        });
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
                    res.render('events_details', {event});
                }
                else{
                    res.send('Event non trouvé');
                }
            }
        });
    },
};

module.exports = eventController;