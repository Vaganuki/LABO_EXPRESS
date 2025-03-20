const { PORT } = process.env;
const express = require('express');
const app = express();
const router = require('./routes');
const JwtMiddleware = require('./middlewares/jwt.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

const db = require('./models/index');
db.sequelize.sync(); // à mettre dans un ctrller system sync

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(JwtMiddleware);

app.use(express.static('./src/public'));
app.use(router);

app.listen(PORT);