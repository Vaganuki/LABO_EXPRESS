const db = require("../models");
const argon2 = require('argon2');

const userController = {
    get : (req, res) => {
        res.send('wip');
    },
    addUser : async (req, res) => {
        const {nom, prenom, mail, mdp, ddn} = req.body;

        const user = await db.user.findOne({where: {
            mail,
        }});

        if(!user) {
            const hash = await argon2.hash(mdp);
            const data = await db.user.create({nom, prenom, mail, mdp : hash, ddn});
            res.status(201).json(data.toJSON());
        }
        else{
            res.status(400).json({error: 'Ce mail est déjà utilisé'});
        }
    },
};

module.exports = userController;