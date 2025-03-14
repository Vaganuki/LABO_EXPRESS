const yup = require('yup');

const validationMiddleware = (schema) => async (req, res, next) => {
    try{
        console.log(req.body);
        console.log('Dans le middleware')
        const data = await schema.validate(req.body, {abortEarly : false});
        req.body = data;
        next();
    }
    catch(err){
        console.log(err)
        if(err instanceof yup.ValidationError){
            res.status(400).json(err);
        }
        else{
            res.sendStatus(500);
        }
    }
};

module.exports = validationMiddleware;