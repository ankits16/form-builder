import React from "react";
import "./ReqiredFieldAttribute.css";
import { FormFieldLevelOperation } from "../../form-field/FormField";


const ReqiredFieldAttribute = (props) => {
  const handleIsRequiredCheckboxChange = (event) => {
    var updatedFormModel = {...props.formField.form_model}
    updatedFormModel.required = event.target.checked
    console.log(updatedFormModel)
    props.operation(
        FormFieldLevelOperation.UpdateFieldAttribute,
        {'form_model' : updatedFormModel}
      );
  };
  return (
    <>
      <div
        key={props.formField.editor_id}
        className="form-field-attribute-container"
      >
        <div>Required</div>
        <div>
          <input
            type="checkbox"
            checked={props.formField.form_model.required ? props.formField.form_model.required : false}
            onChange={handleIsRequiredCheckboxChange}
          />
        </div>
      </div>
    </>
  );
};

export default ReqiredFieldAttribute;
