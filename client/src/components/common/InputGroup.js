import React from 'react';
import classname from 'classname';
import propTypes from 'prop-types';

 const InputGroup = ({
     name, 
     placeholder,
     error,
     onChange,
     value,
     icon,
     type
 }) => {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
        </div>
        <textarea type={type}  placeholder={placeholder} name={name} 
            value ={value}
            onChange = {onChange}
            className={classname('form-control form-control-lg', {'is-invalid' : error })}

        />
        {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

InputGroup.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    icon: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,
    // type: propTypes.string.isRequired
}

// textFiledGroup.defaultProps = {
//     type: "text"
// }

export default InputGroup;