import React from 'react';
import classname from 'classname';
import propTypes from 'prop-types';

 const textFiledGroup = ({
     name, 
     placeholder,
     label,
     error,
     type,
     onChange,
     disabled,
     info,
     value
 }) => {
  return (
    <div className="form-group">
        <input type={type}  placeholder={placeholder} name={name} 
        value ={value}
        onChange = {onChange}
        className={classname('form-control form-control-lg', {'is-invalid' : error })}
        disabled={disabled}
        />
        {info && <small className='form-text text-muted'>{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

textFiledGroup.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    disabled: propTypes.string,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
}

textFiledGroup.defaultProps = {
    type: "text"
}

export default textFiledGroup;