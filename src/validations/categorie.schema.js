const yup = require('yup');

const categorieSchema = yup.object({
    name: yup.string()
        .required()
        .max(255)
        .min(1),
});

module.exports = categorieSchema;