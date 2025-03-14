const express = require('express');
const {PORT} = process.env;
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');

const db = require('./models/index');
db.sequelize.sync();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(express.json());
app.use(router);

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => {
    console.log(`Serveur EXPRESSSSSSSSSSS lancé sur le port ${PORT}`);
});