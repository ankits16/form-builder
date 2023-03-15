import React from "react";
import Accordion from "react-bootstrap/Accordion";
import FormFieldAttribute from "./form-fields/FormFieldAttribute";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import './FormField.css'

export default function FormField(props) {
  console.log('<<<<<<<<< Form field props')
  console.log(props)
  console.log('<<<<<<<<< Form field props end ')
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
    
    <div className="form-section-item-container">
      <div className="col-11">
      <Accordion.Item eventKey={props.index + 1} >
        <Accordion.Header >{props.field.id}</Accordion.Header>
        <Accordion.Body>
          <Accordion.Item>
            <FormFieldAttribute data={props} key={props.field.id} formField={props.field}></FormFieldAttribute>
          </Accordion.Item>
        </Accordion.Body>
        </Accordion.Item>
      </div>
      <div>
          <button
            type="button"
            className="btn btn-info"
            {...listeners}
            {...attributes}
          >
            ::
          </button>
        </div>
    </div>
    
    </div>
  );
}
