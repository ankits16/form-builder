import React from "react";
import { FormFieldLevelOperation } from "../../form-field/FormField";
const IdFieldAttribute = (props) => {
  const handleChange = (event) => {
    // we have to make sure that id of each form field through out the form  is unique
    props.operation(
        FormFieldLevelOperation.UpdateFieldAttribute,
        {'id' : event.target.value}
      );
  };
  return (
    <input type="text" value={props.value} onChange={handleChange}></input>
  );
};

export default IdFieldAttribute;
