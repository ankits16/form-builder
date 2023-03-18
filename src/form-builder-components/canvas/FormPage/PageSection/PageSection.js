import React, { useState } from "react";
import {PageOperations} from "../FormPage.js"
import FormFieldAttribute from "./form-fields-attributes/FormFieldAttribute";
import Accordion from "react-bootstrap/Accordion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddItemOptions from "./AddItemOptions/AddItemOptions";
import FormField from "./FormField";
import "./PageSection.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MdOutlineDragIndicator, MdDelete } from "react-icons/md";

/**
 * opeartions at page section level
 * - add field
 * - delete field
 * - update field
 */
export const PageSectionLevelOperations = Object.freeze({
  AddField: Symbol('addField'),
  DeleteField: Symbol('deleteField'),
  UpdateField: Symbol('updateField'),
});

const PageSection = (props) => {
  
  /**
   * dnd kit sortable related
   */
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  /**
   * get section title for a section. If empty simply return Section_<<id>>
   */
  const getHeader = () => {
    return props.section.title
      ? props.section.title
      : "Section_" + props.section.id;
  };

  const handleSectionDeletion = () => {
    props.operation(PageOperations.DeleteSection, props.section.id)
  };

  const callUpdateSection = (updatedFields) => {
    let updatedSection = { ...props.section };
    updatedSection.fields = updatedFields;
    props.operation(PageOperations.UpdateSection, [updatedSection])
  };

  const deleteField = (fieldId)=>{
    let filteredFields = props.section.fields.filter((e) => {
      return e.editor_id !== fieldId;
    });
    filteredFields.map((section, index) => {
      section.editor_id = index;
    });
    callUpdateSection(filteredFields)
  }

  const addField = (newField) =>{
    let updatedFields = [... props.section.fields, newField]
    callUpdateSection(updatedFields)
  }

  const updateFields = (impactedFields)=>{
    let updatedFields = [...props.section.fields];
    impactedFields.map((impactedField) => {
      let oldFieldIndex = -1;
      updatedFields.map((field, index) => {
        if (field.editor_id === impactedField.editor_id) {
          oldFieldIndex = index;
        }
      });
      updatedFields.splice(oldFieldIndex, 1, impactedField);
    });
    callUpdateSection(updatedFields)
  }

  const operation = (operationType, params)=>{
    switch (operationType){
      case PageSectionLevelOperations.AddField:
        addField(params)
        break
      case PageSectionLevelOperations.DeleteField:
        deleteField(params)
        break
      case PageSectionLevelOperations.UpdateField:
        updateFields(params)
        break
      default:
        console.error("Uxexpedted operation type at form field level " + operationType)
    }
  }

  /**
   * update the data source or parent json afterthe drag and drop of a section is complete
   */
  const updateDatasourceAfterFieldDragEnd = ((event) => {
    console.log("updateDatasourceAfterFieldDragEnd");
    const { active, over } = event;
    let items = props.section.fields;
    
    if (active.id !== over.id) {
      let activeField = items.filter(
        (field) => field.editor_id === active.id
      )[0];
      let overField = items.filter((field) => field.editor_id === over.id)[0];
      const oldIndex = items.indexOf(activeField);
      const newIndex = items.indexOf(overField);
      items = arrayMove(items, oldIndex, newIndex);
    }
    callUpdateSection(items)
  })

  const editorIds = []
  props.section.fields.map((field)=>{
    editorIds.push(field.editor_id)
  })

  const handleSectionTitleChange = (event) => {
    let updatedSection = {... props.section}
    updatedSection.title = event.target.value;
    props.operation(PageOperations.UpdateSection, [updatedSection])
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="form-item-header-container">
        <div className="form-item-header-item">
          <button
            type="button"
            className="btn"
            {...listeners}
            {...attributes}
          >
             <MdOutlineDragIndicator/>
          </button>
        </div>
        <div className="col-8">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{getHeader()}</Accordion.Header>
              <Accordion.Body>
                <div className="form-item-header-container" style={{padding:10}}>
                  <div>
                    <label htmlFor="inputPassword7" className="col-form-label">
                      Section Title
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id={"inputPassword" + props.section.id}
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      value={props.section.title}
                      onChange={handleSectionTitleChange}
                    />
                  </div>
                  <div>
                    <AddItemOptions data={props} operation ={operation}/>
                  </div>
                </div>
                <div>
                  <DndContext
                    sensors={props.sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={updateDatasourceAfterFieldDragEnd}
                  >
                    <SortableContext
                      items={editorIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {props.section.fields.map((field, index) => {
                        let key = "FormField" + field.editor_id;
                        return (
                          //   <Accordion.Item eventKey={index + 1}>
                          <FormField
                            key={key}
                            id={field.editor_id}
                            index={index}
                            field={field}
                            data={props.data}
                            operation={operation}
                          ></FormField>
                          //   </Accordion.Item>
                        );
                      })}
                    </SortableContext>
                  </DndContext>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="form-item-header-item">
          <button className="btn" onClick={handleSectionDeletion}>
            <MdDelete/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageSection;
