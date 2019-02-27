import React from 'react';
import classname from 'classname';
import propTypes from 'prop-types';

 const TextAreaFieldGroup = ({
     name, 
     placeholder,
     label,
     error,
     onChange,
    
     info,
     value
 }) => {
  return (
    <div className="form-group">
        <textarea  placeholder={placeholder} name={name} 
            value ={value}
            onChange = {onChange}
            className={classname('form-control form-control-lg', {'is-invalid' : error })}

        />
        {info && <small className='form-text text-muted'>{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

TextAreaFieldGroup.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,
}

// textFiledGroup.defaultProps = {
//     type: "text"
// }

export default TextAreaFieldGroup;