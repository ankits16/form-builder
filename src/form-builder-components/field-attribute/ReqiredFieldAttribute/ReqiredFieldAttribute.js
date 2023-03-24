import React from "react";
import "./ReqiredFieldAttribute.css";
import { FormFieldLevelOperation } from "../../form-field/FormField";


const ReqiredFieldAttribute = (props) => {
  // //console('<<<<<<< ReqiredFieldAttribute id = ' + props.formField.id + '---- keys' + Object.keys(props.formField.form_model))
  // //console(props.formField.form_model)
  const formModel =  props.formField.form_model// JSON.parse(props.formField.form_model)
  // //console('<<<<<<< ReqiredFieldAttribute ' + props.formField.id + 'required = ' + formModel.required)
  // //console(formModel)
  const handleIsRequiredCheckboxChange = (event) => {
    var updatedFormModel = {...props.formField.form_model}
    updatedFormModel.required = event.target.checked
    //console(updatedFormModel)
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
            checked={formModel.required ? formModel.required : false}
            onChange={handleIsRequiredCheckboxChange}
          />
        </div>
      </div>
    </>
  );
};

export default ReqiredFieldAttribute;
