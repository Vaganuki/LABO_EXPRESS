const yup = require('yup');

const validationMiddleware = (schema) => async (req, res, next) => {
    try{
        const data = await schema.validate(req.body, {abortEarly : false});
        req.body = data;
        next();
    }
    catch(err){
        if(err instanceof yup.ValidationError){
            res.status(400).json(err);
        }
        else{
            res.status(500);
        }
    }
};

module.exports = validationMiddleware;