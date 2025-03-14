const yup = require('yup');

function getMinDate() {
    return new Date();
}

const eventSchema = yup.object({
    name: yup.string()
        .required()
        .max(255)
        .min(1),
    description: yup.string()
        .required()
        .min(1),
    places_count: yup.number()
        .integer()
        .positive(),
    id_categorie: yup.number()
        .required()
        .integer()
        .positive(),
    id_format: yup.number()
        .required()
        .integer()
        .positive(),    
    image: yup.mixed()
        .test('fileSize','Image trop grosse t\'as capté',
            value => value && value.size <= 200000000
        )
        .test('fileType','On aime pas trop les images comme toi par ici',
            value => value && ['image/jpeg','image/png','image/gif'].includes(value.mimetype)
        ),
    date_debut: yup.date()
        .required()
        .min(getMinDate())
        .max(yup.ref('date_fin')),
    date_fin: yup.date()
        .min(yup.ref('date_debut'))
        .required(),
    annulation: yup.boolean()
        .default(false),
    id_createur: yup.number()
        .integer()
        .positive()
        .required(),
});

module.exports = eventSchema;