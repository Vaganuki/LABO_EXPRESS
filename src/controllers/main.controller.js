const mainController = {
    get : (req,res) => {
        // res.render('home');
        res.status(200).json(`Ok t'es bien en ligne`);
    },
};

module.exports = mainController;