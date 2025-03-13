const eventsRouter = require('express').Router();
const eventController = require('../controllers/event.controller');

eventsRouter.get('/', eventController.get);
eventsRouter.get('/:id', eventController.getById);

module.exports = eventsRouter;