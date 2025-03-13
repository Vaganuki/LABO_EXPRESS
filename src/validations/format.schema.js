const yup = require('yup');

const formatSchema = yup.object({
    name: yup.string()
        .required()
        .max(255)
        .min(1),
});

module.exports = formatSchema;