import React from "react";
import "./FormFieldAttribute.css";
const FormFieldAttribute = (props) => {
  const handleChange = ((event)=>{
    console.log(props)
  })
  let keys = Object.keys(props.formField).filter((key)=>{
    return key !== 'editor_id1'
  })
  return keys.map((key) => {
    return (
      <div className="card" style={{height: 50, padding: 10}}>
      <div className="form-field-container">
        <div>{key}</div>
        <div>
          <input type="text" value={props.formField[key]} onChange={handleChange}></input>
        </div>
      </div>
      </div>
    );
  });
};

export default FormFieldAttribute;
