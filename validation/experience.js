const validator = require('validator');
const isEmpty = require('./is-empty')
module.exports = function validateExperinceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    // data.company = !isEmpty(data.company) ? data.company : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'Titlte field is invaliid'
    }

    if (validator.isEmpty(data.company)) {
        errors.company = 'company field is invaliid'
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'from field is invaliid'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}