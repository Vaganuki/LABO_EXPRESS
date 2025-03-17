const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const userSchema = require('../validations/user.schema');

const usersRouter = require('express').Router();

usersRouter.get('/', userController.get)
    .post('/',validationMiddleware(userSchema), userController.addUser)
    .post('/login', userController.login);

module.exports = usersRouter;