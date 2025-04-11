const db = require("../models");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userController = {
    get: (req, res) => {
        res.send('wip');
    },
    addUser: async (req, res) => {
        try {
            const {nom, prenom, mail, mdp, ddn} = req.body;

            const user = await db.user.findOne({
                where: {
                    mail,
                }
            });

            if (!user) {
                const hash = await argon2.hash(mdp);
                const data = await db.user.create({nom, prenom, mail, mdp: hash, ddn});
                res.status(201).json(data.toJSON());
            } else {
                res.status(400).json({error: 'Ce mail est déjà utilisé'});
            }
        } catch (err) {
            console.error(`Erreur lors de la récupération des événements :`, err);
            res.status(500).json({
                error: `Une erreur est servenue lors de la récupération des données.`,
                details: err.message
            });
        }
    },
    login: async (req, res) => {
        let user = null;
        const {mail, mdp} = req.body;
        try {
            user = await db.user.findOne({where: {mail}});

        } catch (err) {
            console.error(`Erreur lors de la récupération des événements :`, err);
            res.status(500).json({
                error: `Une erreur est survenue lors de la récupération des données.`,
                details: err.message
            });
            return;
        }
        if (user) {
            try {
                if (await argon2.verify(user.mdp, mdp)) {
                    const token = jwt.sign({
                        id: user.id,
                        mail: user.mail,
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1d',
                        algorithm: 'HS256',
                    });
                    res.status(202).json(token);
                } else {
                    res.status(401).json(`Email ou mot de passe incorrect`);
                }
            } catch (err) {
                res.status(500).json('Erreur serveur');
            }
        } else {
            res.status(401).json(`Email ou mot de passe incorrect`);
        }
    },
};

module.exports = userController;