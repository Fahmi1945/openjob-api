const Joi = require('joi');

const ApplicationPayloadSchema = Joi.object({
    user_id: Joi.string().required(),
    job_id: Joi.string().required(),
    status: Joi.string().optional()
});

const ApplicationUpdatePayloadSchema = Joi.object({
    status: Joi.string().required()
});

module.exports = { ApplicationPayloadSchema, ApplicationUpdatePayloadSchema };