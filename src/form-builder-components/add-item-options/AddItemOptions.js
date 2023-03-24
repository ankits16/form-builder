import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PageSectionLevelOperations } from "../page-section/PageSection";

const AddItemOptions = (props) => {
  const getNewFormFieldId = () => {
    //console(props);
    let newFieldEditorId = props.data.section.fields.length + 1;
    //console(newFieldEditorId);
    return newFieldEditorId;
  };

  const addFormField = (fieldDict) => {
    let updatedFieldDict = { ...fieldDict };
    if (!updatedFieldDict.form_model) {
      updatedFieldDict.form_model = { required: true };
    } else {
      updatedFieldDict.form_model = updatedFieldDict.form_model;
    }
    props.operation(PageSectionLevelOperations.AddField, updatedFieldDict);
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
      form_model: {
        imageCapture: {
          max: 10,
        },
      },
    });
  };

  const addVideoField = () => {
    addFormField({
      editor_id: getNewFormFieldId(),
      id: "",
      type: "video ",
      view_label: "",
      capture_label: "",
      form_model: {
        videoCapture: {
          acceptMedia: "vyn.AcceptMediaTypes.AudioVideo",
          acceptMediaOptions: [
            "vyn.AcceptMediaTypes.AudioVideo",
            "vyn.AcceptMediaTypes.Video",
          ],
          canPause: false,
          maxDuration: 20000,
          width: 640,
          height: 480,
          facingMode: "vyn.FacingModes.Front",
          capture_label: "'Record a video showing surroundin'",
        },
        required: false,
      },
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
      options: [],
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
      options: [],
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
