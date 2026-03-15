const Joi = require('joi');

const CompanyPayloadSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
});

const CompanyUpdatePayloadSchema = Joi.object({
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    description: Joi.string().optional(),
}).min(1);

module.exports = { CompanyPayloadSchema, CompanyUpdatePayloadSchema };