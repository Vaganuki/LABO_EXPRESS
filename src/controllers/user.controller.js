const db = require("../models");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

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
    login : async (req, res) => {
        const {mail, mdp} = req.body;
        const user = await db.user.findOne( {where: { mail } } );
        if(user){
            try{
                if( await argon2.verify(user.mdp, mdp) ){
                    const token = jwt.sign({
                        id: user.id,
                        mail: user.mail,
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1d',
                        algorithm: 'HS256',
                    });
                    res.json(token);
                }
                else{
                    res.status(401).json(`Email ou mot de passe incorrect`);
                }
            }
            catch(err){
                res.status(500).json('Erreur serveur');
            }
        }
        else{
            res.status(401).json(`Email ou mot de passe incorrect`);
        }
    },
};

module.exports = userController;