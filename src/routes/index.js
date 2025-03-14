const mainController = require('../controllers/main.controller');
const eventsRouter = require('./events.router');
const usersRouter = require('./users.router');

const router = require('express').Router();

router.get('/', mainController.get);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);

module.exports = router;