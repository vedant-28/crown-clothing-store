import React from "react";
import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-input-group">
			<input {...otherProps} className="form-input"/>
      {label && (
        <label 
					className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
						{label}
				</label>
			)}
    </div>
  )
}

export default FormInput;
