import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PageSectionLevelOperations } from "../PageSection";

const AddItemOptions = (props) => {
  
  const getNewFormFieldId = () => {
    console.log(props);
    let newFieldEditorId = props.data.section.fields.length + 1;
    console.log(newFieldEditorId);
    return newFieldEditorId;
  };

  const addFormField = (fieldDict) => {
    props.operation(PageSectionLevelOperations.AddField, fieldDict);
  };

  const addTextField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "text ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addImageField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "image ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addVideoField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "video ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addCheckboxField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "checkbox_field_id_" + getNewFormFieldId(),
      type: "checkbox ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addQuantityField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "quantity ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addSelectField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "select",
      view_label: "",
      capture_label: "",
      options:[],
      form_model: "",
    });
  };

  const addOptionField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "options",
      view_label: "",
      capture_label: "",
      options:[],
      form_model: "",
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <MdFormatListBulletedAdd />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={addTextField}>
          Text
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={addVideoField}>
          Video
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={addImageField}>
          Image
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={addCheckboxField}>
          Checkbox
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={addQuantityField}>
          Quantity
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={addSelectField}>
          Select
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={addOptionField}>
          Options
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AddItemOptions;
