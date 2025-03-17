const eventsRouter = require('express').Router();
const eventController = require('../controllers/event.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const eventSchema = require('../validations/event.schema');
const upload = require('../middlewares/multer.middleware');
const JwtMiddleware = require('../middlewares/jwt.middleware');

eventsRouter.get('/', eventController.get)
    .get('/archives', eventController.getAll)
    .get('/:id', eventController.getById)
    .post('/:id/inscription', JwtMiddleware, eventController.inscription)
    .put('/:id/edit', JwtMiddleware, upload.single('image'), validationMiddleware(eventSchema), eventController.update)
    .post('/',JwtMiddleware, upload.single('image'), validationMiddleware(eventSchema), eventController.addEvent);

module.exports = eventsRouter;