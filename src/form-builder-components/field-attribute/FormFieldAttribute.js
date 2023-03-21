import React from "react";
import DependencyContainer from "../dependency-container/DependencyContainer";
import "./FormFieldAttribute.css";
import IdFieldAttribute from "./IdFieldAttribute/IdFieldAttribute";
import OptionsFieldsAttribute from "./OptionsFieldsAttribute/OptionsFieldsAttribute";
import ReqiredFieldAttribute from "./ReqiredFieldAttribute/ReqiredFieldAttribute";
import ViewLabelFieldAttribute from "./ViewLabelFieldAttribute/ViewLabelFieldAttribute";
const FormFieldAttribute = (props) => {
  const fieldAttributeDisplayMap = {
    id: "Id",
    type: "Type",
    view_label: "View Label",
    capture_label: "Capture Label",
    form_model: "Form Model",
    options: "Options",
    required: "Required",
  };

  const getFieldAttribute = (key) => {
    console.log('<<<<<<< FormFieldAttribute getFieldAttribute ' + props.formField.id)
    console.log(props.formField)
    console.log('+++++++ FormFieldAttribute getFieldAttribute')
    switch (key) {
      case "id":
        return (
          <IdFieldAttribute
            key={key}
            value={props.formField[key]}
            operation={props.operation}
            data ={props.data}
            idsMap={props.idsMap}
          />
        );
      case "view_label":
        return (
          <ViewLabelFieldAttribute
            key={key}
            field={props.formField}
            operation={props.operation}
            idsMap={props.idsMap}
          />
        );
      case "options":
        return (
          <OptionsFieldsAttribute
            field={props.formField}
            operation={props.operation}
          />
        );
      case "form_model":
        return (
          <textarea
            key={key}
            type="textarea"
            value={JSON.stringify(props.formField.form_model)}
            onChange={handleChange}
          ></textarea>
        );
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

  

  const getRequiredField = () => {
    return (
      <ReqiredFieldAttribute formField ={props.formField} operation={props.operation} />
    );
  };


  const parseFormMode = () => {
    return <div>{getRequiredField()}</div> ;
  };

  const getAttributesLayout = () => {
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
  const prepareFieldAttributes = () => {
    return (
      <>
        {parseFormMode()}
        <>{getAttributesLayout()}</>
        <><DependencyContainer form_model={props.formField.form_model}/></>
      </>
    );
  };

  return (<>{prepareFieldAttributes()}</>);
};

export default FormFieldAttribute;
