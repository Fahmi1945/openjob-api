const InvariantError = require('../../utils/exceptions/InvariantError');
const { ApplicationPayloadSchema, ApplicationUpdatePayloadSchema } = require('./schema');

const ApplicationsValidator = {
    validateApplicationPayload: (payload) => {
        const validationResult = ApplicationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateApplicationUpdatePayload: (payload) => {
        const validationResult = ApplicationUpdatePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    }
};

module.exports = ApplicationsValidator;