const Joi = require('joi')

const userSchema = Joi.object({
    username:Joi.string().required(),
    fullname:Joi.string().required(),
    password:Joi.string().required(),
    repeat_password:Joi.ref('password'),
    dp:Joi.string().required(),
    dob:Joi.string().required(),
    bio:Joi.string().required(),
})

const jwtSchema = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required(),
})

module.exports={userSchema,jwtSchema}