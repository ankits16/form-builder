import React from "react";
import "./FormFieldAttribute.css";
const FormFieldAttribute = (props) => {
  const handleChange = ((event)=>{

  })
  let keys = Object.keys(props.formField).filter((key)=>{
    return key !== 'editor_id1'
  })
  return keys.map((key) => {
    return (
      <div className="form-field-container col-auto">
        <div>{key}</div>
        <div>
          <input type="text" value={props.formField[key]} onChange={handleChange}></input>
        </div>
      </div>
    );
  });
};

export default FormFieldAttribute;
