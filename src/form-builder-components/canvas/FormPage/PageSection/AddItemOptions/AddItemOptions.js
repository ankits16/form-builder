import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const AddItemOptions = (props) => {
  const getNewFormFieldId = () => {
    console.log(props);
    let newFieldEditorId = props.data.section.fields.length + 1
    console.log(newFieldEditorId);
    return newFieldEditorId;
  };
  const addFormField = (fieldDict) => {
    let fields = [...props.data.section.fields, fieldDict];
    let updatedJson = { ...props.data.data.formData };

    updatedJson.pages.map((page) => {
      if (page.id === props.data.page.id) {
        page.sections.map((section) => {
          if (section.id === props.data.section.id) {
            section.fields = fields;
          }
        });
      }
    });
    console.log(updatedJson);
    console.log("added form field in section " + props.data.section.id);

    props.data.data.formOperation(updatedJson);
  };
  const addTextField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "field_id_" + getNewFormFieldId(),
      type: "text ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addImageField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "image_field_id_" + getNewFormFieldId(),
      type: "image ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  const addVideoField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "video_field_id_" + getNewFormFieldId(),
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
      id: "quantity_field_id_" + getNewFormFieldId(),
      type: "quantity ",
      view_label: "",
      capture_label: "",
      form_model: "",
    });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Add Field
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
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AddItemOptions;
