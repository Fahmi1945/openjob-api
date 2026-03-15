const InvariantError = require('../../utils/exceptions/InvariantError');
const { CompanyPayloadSchema, CompanyUpdatePayloadSchema } = require('./schema');

const CompaniesValidator = {
    validateCompanyPayload: (payload) => {
        const validationResult = CompanyPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
    validateCompanyUpdatePayload: (payload) => {
        const validationResult = CompanyUpdatePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = CompaniesValidator;