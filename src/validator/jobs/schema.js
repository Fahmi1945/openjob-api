const Joi = require('joi');

const JobPayloadSchema = Joi.object({
    company_id: Joi.string().required(),
    category_id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    job_type: Joi.string().required(),
    experience_level: Joi.string().required(),
    location_type: Joi.string().required(),
    location_city: Joi.string().optional().allow(null, ''),
    salary_min: Joi.number().optional().allow(null),
    salary_max: Joi.number().optional().allow(null),
    is_salary_visible: Joi.boolean().required(),
    status: Joi.string().required(),
});

const JobUpdatePayloadSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    job_type: Joi.string().optional(),
    experience_level: Joi.string().optional(),
    location_type: Joi.string().optional(),
    location_city: Joi.string().optional().allow(null, ''),
    salary_min: Joi.number().optional().allow(null),
    salary_max: Joi.number().optional().allow(null),
    is_salary_visible: Joi.boolean().optional(),
    status: Joi.string().optional(),
    company_id: Joi.string().optional(),
    category_id: Joi.string().optional()
}).min(1);

module.exports = { JobPayloadSchema, JobUpdatePayloadSchema };