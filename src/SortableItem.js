import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Accordion from "react-bootstrap/Accordion";
import { Item } from "./Item";
import Card from "react-bootstrap/Card";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} >
        <button {...listeners} {...attributes}>
          Drag handle
        </button>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{props.id}</Accordion.Header>
          <Accordion.Body>this is content for {props.id}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    
  );
}
