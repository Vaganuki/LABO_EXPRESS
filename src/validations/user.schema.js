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
        .required('Veuillez entrez un mot de passe')
        .min(8)
        .test('isValidPass', 'Le mot de passe n\'est pas valide', (value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            
            const hasNumber = /[0-9]/.test(value);
            
            const hasLowerCase = /[a-z]/.test(value);
            
            const hasSymbole = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value);
            
            const regexForSequentialChars = /(0123456789|abcdefghijklmnopqrstuvwxyz|!@#\$%\^&\*\(\)_\+\|<>\?\/\\,\.\-)([A-Z]{3,})/;
            const hasSequentialChars = regexForSequentialChars.test(value);
            
            if (hasSequentialChars) return false;

            return hasUpperCase && hasNumber && hasLowerCase && hasSymbole;
        }),
    ddn: yup.date(),
});

module.exports = userSchema;