const eventsRouter = require('express').Router();
const eventController = require('../controllers/event.controller');

eventsRouter.get('/', eventController.get)
    .get('/archives', eventController.getAll)
    .get('/:id', eventController.getById)
    .post('/', eventController.addEvent);

module.exports = eventsRouter;