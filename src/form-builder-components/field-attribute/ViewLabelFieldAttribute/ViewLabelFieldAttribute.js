import React from "react";
import { FormFieldLevelOperation } from "../../form-field/FormField";

const ViewLabelFieldAttribute = (props) => {
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleChange = (event) => {
    // we have to make sure that slugified version of view label is updated in id as well
    //console(props.field);
    let currentSlugifiedViewLabel = slugify(props.field.view_label);
    let impactedAttributes = { view_label: event.target.value };
    if (
      props.field.id.length === 0 ||
      props.field.id === currentSlugifiedViewLabel
    ) {
      impactedAttributes["id"] = slugify(event.target.value);
    }

    props.operation(
      FormFieldLevelOperation.UpdateFieldAttribute,
      impactedAttributes
    );
  };
  return (
    <input
      type="text"
      value={props.field.view_label}
      onChange={handleChange}
    ></input>
  );
};

export default ViewLabelFieldAttribute;
