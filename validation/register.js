const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data)
{
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
