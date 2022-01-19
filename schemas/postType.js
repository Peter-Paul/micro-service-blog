const Joi = require('joi')

const postSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    user:Joi.string().required(),
})

module.exports={postSchema}