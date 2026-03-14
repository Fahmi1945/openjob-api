const ClientError = require('../utils/exceptions/Clienterror');

const validate = (schema) => (req, res, next) => {
    if (!schema || typeof schema.validate !== 'function') {
        return next(new Error('Validation schema is invalid or not provided.'));
    }

    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(new ClientError(message));
    }

    req.body = value;
    return next();
};

module.exports = validate;