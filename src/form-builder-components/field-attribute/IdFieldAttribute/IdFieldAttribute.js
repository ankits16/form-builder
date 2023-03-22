import React, { useEffect, useState } from "react";
import { FormFieldLevelOperation } from "../../form-field/FormField";
import "./IdFieldAttribute.css";

const IdFieldAttribute = (props) => {
  const [idConflict, setIdConflict] = useState(false);

  useEffect(() => {
    // console.log("<<<<<<<<<<< IdFieldAttribute + useEffect");
    // console.log(props);
    checkIfIdIsConflicting(props.value);
  }, [props.form_ids_map]);

  const checkIfIdIsConflicting = (fieldId) => {
    var ids = [];
    var count = 0;
    
    // props.data.pages.map((page) => {
    //   page.sections.map((section) => {
    //     section.fields.map((field) => {
    //       if (field.id === fieldId) {
    //         count = count + 1;
    //       }
    //       ids.push(field.id);
    //     });
    //   });
    // });
    // console.log('^^^^^^^^^^^^^^^^ checkIfIdIsConflicting')
    // console.log(props.idsMap)
    // console.log(fieldId)
    // console.log(props.idsMap[fieldId].length)
    
    if (props.form_ids_map[fieldId].length > 1){
      setIdConflict(true);
    }else{
      setIdConflict(false);
    }
    // console.log('========== finished checkIfIdIsConflicting')
    
    
  };

  const handleChange = (event) => {
    // we have to make sure that id of each form field through out the form  is unique

    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      id: event.target.value,
    });
    console.log('@@@@@@@@@@@@@ checkIfIdIsConflicting '  + event.target.value)
    // checkIfIdIsConflicting(event.target.value);
  };
  return (
    <input
      type="text"
      className={idConflict ? "error-id-field" : "normal-id-field"}
      value={props.value}
      onChange={handleChange}
    ></input>
  );
};

export default IdFieldAttribute;
