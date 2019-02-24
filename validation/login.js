const validator = require('validator');
const isEmpty = require('./is-empty')
module.exports = function validateLoginInput(data) {
    let errors = {};
    console.log(data)
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is invaliid'
    }

    // if (validator.isEmpty(data.email)) {
    //     errors.email = 'Email field is required'
    // }

    if (validator.isEmpty(data.password)) {
        errors.password = 'password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}