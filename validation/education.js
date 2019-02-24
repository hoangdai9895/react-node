const validator = require('validator');
const isEmpty = require('./is-empty')
module.exports = function validateEducationInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    // data.company = !isEmpty(data.company) ? data.company : '';

    if (validator.isEmpty(data.school)) {
        errors.school = 'school field is invaliid'
    }

    if (validator.isEmpty(data.degree)) {
        errors.degree = 'degree field is invaliid'
    }

    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'fieldofstudy  is invaliid'
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'from field is invaliid'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}