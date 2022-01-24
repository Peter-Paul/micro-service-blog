const Joi = require('joi')

const photoSchema = Joi.object({
    title:Joi.string().required(),
    url:Joi.string().required(),
    album:Joi.string().required(),
})

module.exports={photoSchema}