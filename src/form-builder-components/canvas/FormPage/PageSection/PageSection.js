import React, { useState } from "react";
import FormFieldAttribute from "./form-fields/FormFieldAttribute";
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

const PageSection = (props) => {
  // console.log('<<<<<<<PageSection init>>>>>>>')
  // console.log(props)
  // console.log('<<<<<<<PageSection init end>>>>>>>')
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [sectionTitle, setSectionTitle] = useState(props.section.title);
  // setSectionTitle(props.section.title)

  const getHeader = () => {
    // console.log(props.section);
    return props.section.title
      ? props.section.title
      : "Section " + props.section.id;
  };

  const deleteSection = () => {
    console.log("delete section");
    console.log(props);

    let sectionId = props.section.id;
    let filteredSections = props.page.sections.filter((e) => {
      return e.id !== sectionId;
    });
    filteredSections.map((section, index) => {
      section.id = index;
    });
    console.log("filteredSections");
    console.log(filteredSections);
    let updatedFormData = { ...props.data.formData };
    updatedFormData.pages.map((page, index) => {
      console.log(page.id + "-----" + props.pageIndex);
      if (index === props.pageIndex) {
        page.sections = filteredSections;
      }
    });
    console.log(updatedFormData);
    props.data.formOperation(updatedFormData);
  };

  function updateDatasourceAfterFieldDragEnd(event) {
    console.log("updateDatasourceAfterFieldDragEnd");
    const { active, over } = event;
    console.log(props);
    let updatedJson = { ...props.data.formData };
    let items = props.section.fields;
    // console.log('<< handleDragEnd')
    // console.log(active)
    // console.log(over.id )

    if (active.id !== over.id) {
      let activeField = items.filter(
        (field) => field.editor_id === active.id
      )[0];
      let overField = items.filter((field) => field.editor_id === over.id)[0];
      const oldIndex = items.indexOf(activeField);
      const newIndex = items.indexOf(overField);
      items = arrayMove(items, oldIndex, newIndex);
    }
    updatedJson.pages.map((page) => {
      if (page.id === props.page.id) {
        page.sections.map((section) => {
          if (section.id === props.section.id) {
            section.fields = items;
          }
        });
      }
    });
    // console.log("updated JSon");
    // console.log(updatedJson);
    props.data.formOperation(updatedJson);
  }

  const handleSectionTitleChange = (event) => {
    // console.log('handleSectionTitleChange')
    // console.log(props)
    let updatedJson = { ...props.data.formData };
    console.log(event.target.value);
    updatedJson.pages.map((page) => {
      if (page.id === props.page.id) {
        page.sections.map((section) => {
          if (section.id === props.section.id) {
            section.title = event.target.value;
          }
        });
      }
    });
    props.data.formOperation(updatedJson);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="form-item-header-container">
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
        <div className="col-8">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{getHeader()}</Accordion.Header>
              <Accordion.Body>
                <div className="form-item-header-container" style={{padding:10}}>
                  <div>
                    <label htmlFor="inputPassword7" className="col-form-label">
                      section title
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
                    <AddItemOptions data={props} />
                  </div>
                </div>
                <div>
                  <DndContext
                    sensors={props.sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={updateDatasourceAfterFieldDragEnd}
                  >
                    <SortableContext
                      items={props.section.fields}
                      strategy={verticalListSortingStrategy}
                    >
                      {props.section.fields.map((field, index) => {
                        console.log("formfield map ");
                        console.log(field);

                        let key = "FormField" + field.editor_id;
                        console.log("key = " + key);
                        console.log("end formfield map ");
                        return (
                          //   <Accordion.Item eventKey={index + 1}>
                          <FormField
                            key={key}
                            id={field.editor_id}
                            index={index}
                            field={field}
                
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
          <button className="btn btn-danger" onClick={deleteSection}>
            Delete Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageSection;
