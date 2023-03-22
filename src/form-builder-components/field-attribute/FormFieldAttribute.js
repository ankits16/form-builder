import React from "react";
import DependencyCollapsibleContainer from "../dependency-container/DependencyCollapsibleContainer";
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
    // console.log('<<<<<<< FormFieldAttribute getFieldAttribute ' + props.formField.id)
    // console.log(props.formField)
    // console.log('+++++++ FormFieldAttribute getFieldAttribute')
    switch (key) {
      case "id":
        return (
          <IdFieldAttribute
            key={key}
            value={props.formField[key]}
            operation={props.operation}
            data={props.data}
            form_ids_map={props.form_ids_map}
          />
        );
      case "view_label":
        return (
          <ViewLabelFieldAttribute
            key={key}
            field={props.formField}
            operation={props.operation}
            form_ids_map={props.form_ids_map}
          />
        );
      case "options":
        return (
          <OptionsFieldsAttribute
            key={key}
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
            style={{ height: "100%", width: "100%" }}
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
      <ReqiredFieldAttribute
        key={'required_field_attribute'+Date.now()}
        formField={props.formField}
        operation={props.operation}
      />
    );
  };

  const parseFormMode = () => {
    return <div key={'required_field_container'+Date.now()}>{getRequiredField()}</div>;
  };

  const getAttributesLayout = () => {
    return keys.map((key, index) => {
      return (
        <div key= {'field_attribute'+index} className="form-field-attribute-container">
          <div>
            {fieldAttributeDisplayMap[key]
              ? fieldAttributeDisplayMap[key]
              : key}
          </div>
          <div style={{ width: "100%", paddingLeft: 10 }}>
            {getFieldAttribute(key)}
          </div>
        </div>
      );
    });
  };

  const handleFormModelAfterDependencyUpdate = (dependencies) => {};
  const prepareFieldAttributes = () => {
    return (
      <div key={"l1" + Date.now()}>
        {parseFormMode()}
        <div key={"att_layout" + Date.now()}>{getAttributesLayout()}</div>
        <DependencyCollapsibleContainer
          key={"dcc" + Date.now()}
          data={props.data}
          form_model={props.formField.form_model}
          form_ids_map={props.form_ids_map}
          update={handleFormModelAfterDependencyUpdate}
        />
      </div>
    );
  };

  return <>{prepareFieldAttributes()}</>;
};

export default FormFieldAttribute;
