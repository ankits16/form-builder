import React from "react";
import Accordion from "react-bootstrap/Accordion";
import FormFieldAttribute from "../field-attribute/FormFieldAttribute";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../form-field/FormField.css";
import { MdDragIndicator, MdDelete } from "react-icons/md";
import { PageSectionLevelOperations } from "../page-section/PageSection";

export const FormFieldLevelOperation = Object.freeze({
  UpdateFieldAttribute : Symbol('updateAttribute')
})

export default function FormField(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFieldDeletion = ()=>{
    props.operation(PageSectionLevelOperations.DeleteField, props.id)
  }

  const updateField = (impactedFieldAttributes)=>{
    let updatedField = {...props.field}
    console.log('<<<<<< Formfield updatedField')
    console.log(updatedField)
    updatedField = Object.assign({}, updatedField,  impactedFieldAttributes)
    props.operation(PageSectionLevelOperations.UpdateField, [updatedField])
  }

  const operation = (operationType, params)=>{

    switch (operationType){
      case FormFieldLevelOperation.UpdateFieldAttribute:
        updateField(params)
        break;
      default:
        console.error('Unidenfied FormFieldLevelOperation ' + operationType)
    }
  }
  return (
    <div ref={setNodeRef} style={style}>
      <div className="form-section-item-container">
        <div>
          <button type="button" className="btn" {...listeners} {...attributes}>
            <MdDragIndicator />
          </button>
        </div>
        <div className="col-11">
          <Accordion.Item eventKey={props.index + 1}>
            <Accordion.Header>{props.field.id ? props.field.id :( props.field.type + '_'+ (props.index + 1))}</Accordion.Header>
            <Accordion.Body>
              <Accordion.Item>
                <FormFieldAttribute
                  data={props.data}
                  key={props.index}
                  formField={props.field}
                  operation = {operation}
                  form_ids_map={props.form_ids_map}
                ></FormFieldAttribute>
              </Accordion.Item>
            </Accordion.Body>
          </Accordion.Item>
        </div>
        <div className="form-item-header-item">
          <button className="btn" onClick={handleFieldDeletion}>
            <MdDelete/>
          </button>
        </div>
      </div>
    </div>
  );
}
