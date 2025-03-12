const yup = require('yup');

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
    image: yup.mixed()
        .test('fileSize','',
            value => value && value.size <= 200000000
        )
        .test('fileType','',
            value => value && ['image/jpeg','image/png','image/gif'].includes(value.mimetype)
        ),
    date_debut: yup.date()
        .required()
        .min(getMinDate())
        .max(ref('date_fin')),
    date_fin: yup.lazy(()=> date()
        .min(ref('date_debut'))
        .max(getMaxDate())
        )
        .required(),
    annulation: yup.BooleanSchema()
        .default(false),
    id_createur: yup.number()
        .integer()
        .positive()
        .required(),
});

module.exports = eventSchema;