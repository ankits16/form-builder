import React from "react";
import "./FormFieldAttribute.css";
import IdFieldAttribute from "./IdFieldAttribute/IdFieldAttribute";
import OptionsFieldsAttribute from "./OptionsFieldsAttribute/OptionsFieldsAttribute";
import ViewLabelFieldAttribute from "./ViewLabelFieldAttribute/ViewLabelFieldAttribute";
const FormFieldAttribute = (props) => {
  const fieldAttributeDisplayMap = {
    id: "Id",
    type: "Type",
    view_label: "View Label",
    capture_label: "Capture Label",
    form_model: "Form Model",
  };

  const getFieldAttribute = (key) => {
    switch (key) {
      case "id":
        return (
          <IdFieldAttribute
            key={key}
            value={props.formField[key]}
            operation={props.operation}
          />
        );
      case "view_label":
        return (
          <ViewLabelFieldAttribute
            key={key}
            field={props.formField}
            operation={props.operation}
          />
        );
      case "options":
        return (<OptionsFieldsAttribute field={props.formField} operation={props.operation}/>)
      default:
        return (
          <input
          key={key}
            type="text"
            value={props.formField[key]}
            onChange={handleChange}
          ></input>
        );
    }
  };

  const handleChange = (event) => {
    console.log(props);
  };

  let keys = Object.keys(props.formField).filter((key) => {
    return key !== "editor_id";
  });
  return keys.map((key) => {
    return (
        <div className="form-field-attribute-container">
          <div>
            {fieldAttributeDisplayMap[key]
              ? fieldAttributeDisplayMap[key]
              : key}
          </div>
          <div>{getFieldAttribute(key)}</div>
        </div>
    );
  });
};

export default FormFieldAttribute;
