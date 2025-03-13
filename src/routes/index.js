const mainController = require('../controllers/main.controller');
const eventsRouter = require('./events.router');

const router = require('express').Router();

router.get('/', mainController.get);
router.use('/events', eventsRouter);

module.exports = router;