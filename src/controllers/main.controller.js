const mainController = {
    get: (req, res) => {
        try {
            // res.render('home');
            res.status(200).json(`Ok t'es bien en ligne`);
        } catch (err) {
            console.error(`Erreur lors de la récupération des événements :`, err);
            res.status(500).json({ error: `Une erreur est servenue lors de la récupération des données.`, details: err.message });
        };
    },
};

module.exports = mainController;