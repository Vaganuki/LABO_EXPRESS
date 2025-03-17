const {PORT} = process.env;
const express = require('express');
const app = express();
const router = require('./routes');
const JwtMiddleware = require('./middlewares/jwt.middleware');

const db = require('./models/index');
db.sequelize.sync();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());
app.use(JwtMiddleware);

app.use(express.static('./src/public'));
app.use(router);


app.listen(PORT, () => {
    console.log(`Serveur EXPRESSSSSSSSSSS lancé sur le port ${PORT}`);
});