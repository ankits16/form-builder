import React from "react";
import PageSection from "./PageSection/PageSection";

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
import "./FormPage.css";

const FormPage = (props) => {
  const deletePage = () => {
    // props.formOperation("delete-page", props.page.id);
    let pageId = props.page.id;
    let filterdPages = props.formData.pages.filter((e) => {
      return e.id !== pageId;
    });
    filterdPages.map((page, index) => {
      page.id = index;
    });
    let updatedFormData = { ...props.formData };
    updatedFormData.pages = filterdPages;
    console.log("after deletePage", filterdPages);
    props.formOperation(updatedFormData);
  };

  const addSection = () => {
    console.log("addSection");
    let sectionId = props.page.sections.length
      ? props.page.sections.length + 1
      : 1;
    let sections = [
      ...props.page.sections,
      { position:sectionId, id: sectionId, title: sectionId, fields: [] },
    ];

    let updatedJson = { ...props.formData };

    updatedJson.pages.map((page) => {
      if (page.id === props.page.id) {
        page.sections = sections;
      }
    });
    console.log(updatedJson);
    console.log("end addSection");

    props.formOperation(updatedJson);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function updateDatasourceAfterSectionDragEnd(event) {
    
    const { active, over } = event;
    let updatedJson = { ...props.formData };
    let items  = props.page.sections;
    console.log('<< handleDragEnd')
    console.log(active)
    console.log(over.id )
    
    if (active.id !== over.id) {
      let activeSection = items.filter((section)=> section.id === active.id )[0]
      let overSection = items.filter((section)=> section.id === over.id )[0]
      const oldIndex = items.indexOf(activeSection);
      const newIndex = items.indexOf(overSection);
      items = arrayMove(items, oldIndex, newIndex);
    }
    updatedJson.pages.map((page) => {
      if (page.id === props.page.id) {
        page.sections = items;
      }
    });
    props.formOperation(updatedJson);
  }

  return (
    <div>
      <div className="form-page card">
        <div className="form-page__top">
          <div className="form-page__top_item">
            <h2 style={{ color: "red" }}>Page {props.page.id}</h2>
          </div>

          <div className="form-page__top_item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deletePage}
            >
              Delete Page
            </button>
          </div>
          <div className="form-page__top_item">
            <button
              type="button"
              className="btn btn-success"
              onClick={addSection}
            >
              Add section
            </button>
          </div>
        </div>
        <div className="form-page__section">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={updateDatasourceAfterSectionDragEnd}
          >
            <SortableContext
              items={props.page.sections}
              strategy={verticalListSortingStrategy}
            >
              {props.page.sections.map((section, index) => {
                return (
                  <PageSection
                    key={section.id}
                    id={section.id}
                    section={section}
                    formOperation={props.formOperation}
                    formData={props.formData}
                    pageIndex={props.index}
                    page={props.page}
                    sensors = {sensors}
                  ></PageSection>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
