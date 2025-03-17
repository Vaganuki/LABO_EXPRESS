const eventsRouter = require('express').Router();
const eventController = require('../controllers/event.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const eventSchema = require('../validations/event.schema');
const upload = require('../middlewares/multer.middleware');

eventsRouter.get('/', eventController.get)
    .get('/archives', eventController.getAll)
    .get('/:id', eventController.getById)
    .post('/', upload.single('image'), validationMiddleware(eventSchema), eventController.addEvent);
    
module.exports = eventsRouter;