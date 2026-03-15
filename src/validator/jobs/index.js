const InvariantError = require('../../utils/exceptions/InvariantError');
const { JobPayloadSchema, JobUpdatePayloadSchema } = require('./schema');

const JobsValidator = {
    validateJobPayload: (payload) => {
        const validationResult = JobPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateJobUpdatePayload: (payload) => {
        const validationResult = JobUpdatePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
};

module.exports = JobsValidator;