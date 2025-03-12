const yup = require('yup');

const userSchema = yup.object({
    nom: yup.string()
        .required()
        .max(255)
        .min(1),
    prenom: yup.string()
        .required()
        .max(255)
        .min(1),
    mail: yup.string()
         .required()
         .email(),
    mdp: yup.string()
        .required()
        .min(8)
        .test('isValidPass','Mdp pas valide', (value, context) =>{
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
            let validConditions = 0;
            const numberOfMustBeValidConditions = 3;
            const conditions = [hasUpperCase,hasNumber,hasLowerCase,hasSymbole];
            conditions.forEach(condition => (condition? validConditions++ : null))
            if(validConditions>=numberOfMustBeValidConditions){
                return true;
            }
            return false;
        }),
    ddn: yup.date(),
});

module.exports = userSchema;