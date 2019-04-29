const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data) {
    let errors = {};

    data.media = !isEmpty(data.media)?data.media: '';
    data.text = !isEmpty(data.text)?data.text: '';

    // if(!Validator.isLength(data.text,10,300)){
    //     errors.text = 'Text must be between 10 and 300 characters long';
    // }
    
    if (Validator.isEmpty(data.text)){
        errors.text = 'Text cannot be empty';
    }

    if (Validator.isEmpty(data.media)){
        errors.text = 'Media cannot be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};