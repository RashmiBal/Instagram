const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data)
{
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors)
    }
}