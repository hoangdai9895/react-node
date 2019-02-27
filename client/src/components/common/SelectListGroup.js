import React from 'react';
import classname from 'classname';
import propTypes from 'prop-types';

 const SelectListGroup = ({
     name, 
     error,
     onChange,
    
     info,
     value,
     options
 }) => {
     const selectOptions = options.map(option => {
       return (
        <option key={option.label} value={option.value}>
        {option.label}
         </option>
       ) 
     })
  return (
    <div className="form-group">
        <select  
            name={name} 
            value ={value}
            onChange = {onChange}
            className={classname('form-control form-control-lg', {'is-invalid' : error })}

        >
            {selectOptions}
        </select>
        {info && <small className='form-text text-muted'>{info}</small>}
        {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}

SelectListGroup.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired
}

// textFiledGroup.defaultProps = {
//     type: "text"
// }

export default SelectListGroup;