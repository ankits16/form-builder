import React from "react";
import DependencyCollapsibleContainer from "../dependency-container/DependencyCollapsibleContainer";
import DependencyContainer from "../dependency-container/DependencyContainer";
import ExpandingText from "../exapnding-text/ExpandingText";
import { FormFieldLevelOperation } from "../form-field/FormField";
import "./FormFieldAttribute.css";
import IdFieldAttribute from "./IdFieldAttribute/IdFieldAttribute";
import ImageAttribute from "./ImageAttribute/ImageAttribute";
import OptionsFieldsAttribute from "./OptionsFieldsAttribute/OptionsFieldsAttribute";
import ReqiredFieldAttribute from "./ReqiredFieldAttribute/ReqiredFieldAttribute";
import VideoAttribute from "./VideoAttribute/VideoAttribute";
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
    // //console('<<<<<<< FormFieldAttribute getFieldAttribute ' + props.formField.id)
    // //console(props.formField)
    // //console('+++++++ FormFieldAttribute getFieldAttribute')
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
          <div
            key={key}
            type="textarea"
            // value={JSON.stringify(props.formField.form_model)}
            onChange={handleChange}
            style={{ height: "100%", width: "90%", textAlign: "justify", padding:10 }}
          >{JSON.stringify(props.formField.form_model)} </div>
        );
      default:
        return (
          <ExpandingText
            key={key}
            type="text"
            value={props.formField[key]}
            onChange={handleChange}
          ></ExpandingText>
        );
    }
  };

  const handleChange = (event) => {
    //console(props);
  };

  let keys = Object.keys(props.formField).filter((key) => {
    return key !== "editor_id";
  });

  /**
   * manage Required checkbox for form fields
   */
  const getRequiredField = () => {
    return (
      <ReqiredFieldAttribute
        key={"required_field_attribute" + props.index}
        formField={props.formField}
        operation={props.operation}
      />
    );
  };

  /**
   * manage layout of common attributes for all fields
   */
  const getAttributesLayout = () => {
    return keys.map((key, index) => {
      return (
        <div
          key={"field_attribute" + index}
          className="form-field-attribute-container"
        >
          <div className="form-field-key">
            {fieldAttributeDisplayMap[key]
              ? fieldAttributeDisplayMap[key]
              : key}
          </div>
          <div style={{ width: "85%", paddingLeft: 10 }}>
            {getFieldAttribute(key)}
          </div>
        </div>
      );
    });
  };

  const handleFormModelUpdateFromSpecifiFields = (key, updatedAttributes) => {
    var updatedFormModel = { ...props.formField.form_model };
    updatedFormModel[key] = updatedAttributes;
    //console(updatedFormModel);
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      form_model: updatedFormModel,
    });
  };

  /**
   * manage layout of special field usually in form model eg: videoCapture, imageCapture
   */
  const addFormFieldSpecificAttributesIfRequired = () => {
    let type = props.formField.type.trim();
    // //console("--------addFormFieldSpecificAttributesIfRequired - " + type);
    // //console(props);
    if (type === "video") {
      return (
        <VideoAttribute
          index={props.index}
          data={props.data}
          videoAttributes={props.formField.form_model.videoCapture}
          update={handleFormModelUpdateFromSpecifiFields}
        />
      );
    }

    if (type === "image") {
      return (
        <ImageAttribute
          index={props.index}
          data={props.data}
          imageAttributes={props.formField.form_model.imageCapture}
          update={handleFormModelUpdateFromSpecifiFields}
        />
      );
    }

    return (
      <>
        <p>{type}</p>
      </>
    );
  };

  const handleFormModelAfterDependencyUpdate = (expression) => {
    var updatedFormModel = { ...props.formField.form_model };
    updatedFormModel.active = expression;
    // console.log('handleFormModelAfterDependencyUpdate ->>>' + expression)
    // console.log(updatedFormModel);
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      form_model: updatedFormModel,
    });
  };

  const prepareFieldAttributes = () => {
    return (
      <div key={"l1" + props.index}>
        {getRequiredField()}
        <div style={{ padding: 10 }} /*key={"att_layout" + Date.now()}*/>
          {getAttributesLayout()}
        </div>
        <div
          style={{ padding: 10 }} /*key={"special_att_layout" + Date.now()}*/
        >
          {addFormFieldSpecificAttributesIfRequired()}
        </div>
        <div style={{ padding: 10 }} /*key={"dependency_layout" + Date.now()}*/>
          <DependencyCollapsibleContainer
            key={"dcc" + props.index}
            index={props.index}
            data={props.data}
            formField ={props.formField}
            form_model={props.formField.form_model}
            form_ids_map={props.form_ids_map}
            update={handleFormModelAfterDependencyUpdate}
          />
        </div>
      </div>
    );
  };

  return <>{prepareFieldAttributes()}</>;
};

export default FormFieldAttribute;
