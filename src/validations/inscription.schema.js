const yup = require('yup');

const inscriptionSchema = yup.object({
    id_event: yup.number()
        .required()
        .integer()
        .positive(),
    id_user: yup.number()
        .required()
        .integer()
        .positive(),
});

module.exports = inscriptionSchema;