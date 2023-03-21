import React from "react";
import PageSection from "../page-section/PageSection";
import "./FormPage.css";
import { StoryboardLevelOperations } from "../storyboard/Storyboard";

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
/**
 * possible operations at page level
 * - Add section
 * - delete section
 * - Swap Section
 * - Update existing section
 */
export const PageOperations = Object.freeze({
  AddSection: Symbol("add"),
  DeleteSection: Symbol("delete"),
  UpdateSection: Symbol("updateSection"),
});

const FormPage = (props) => {
   /**
   * sensors are required for dnd kit so that drag and drop operation can be performed
   */
   const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * delete page from form builder json
   */
  const deletePage = () => {
    // props.formOperation("delete-page", props.page.id);
    props.operation(StoryboardLevelOperations.DeletePage, props.page.id);
  };

  const callUpdatePage = (updatedSections) => {
    let updatedPage = { ...props.page };
    updatedPage.sections = updatedSections;
    props.operation(StoryboardLevelOperations.UpdatePage, updatedPage);
  };

  /**
   * add a section to the under page item and update the form builder json
   * adds section at the bottom
   */
  const addSection = () => {
    let sectionId = props.page.sections.length
      ? props.page.sections.length + 1
      : 1;
    let sections = [
      ...props.page.sections,
      { position: sectionId, id: sectionId, title: "", fields: [] },
    ];
    callUpdatePage(sections);
  };

  const deleteSectionAtIndex = (sectionId) => {
    console.log("deleteSectionAtIndex called " + sectionId);

    let filteredSections = props.page.sections.filter((e) => {
      return e.id !== sectionId;
    });
    filteredSections.map((section, index) => {
      section.id = index;
    });
    callUpdatePage(filteredSections);
  };

  const updateSection = (impactedSections) => {
    let updatedSections = [...props.page.sections];
    impactedSections.map((impactedSection) => {
      let oldSectionIndex = -1;
      updatedSections.map((section, index) => {
        if (section.id === impactedSection.id) {
          oldSectionIndex = index;
        }
      });
      updatedSections.splice(oldSectionIndex, 1, impactedSection);
    });

    callUpdatePage(updatedSections);
  };

  const performOperation = (operationType, params) => {
    switch (operationType) {
      case PageOperations.DeleteSection:
        deleteSectionAtIndex(params);
        break;
      case PageOperations.UpdateSection:
        updateSection(params);
        break;
      default:
        console.error("unidentified operation");
    }
  };

 

  function updateDatasourceAfterSectionDragEnd(event) {
    const { active, over } = event;
    let updatedJson = { ...props.data.formData };
    let items = props.page.sections;
    
    if (active.id !== over.id) {
      let activeSection = items.filter(
        (section) => section.id === active.id
      )[0];
      let overSection = items.filter((section) => section.id === over.id)[0];
      const oldIndex = items.indexOf(activeSection);
      const newIndex = items.indexOf(overSection);
      items = arrayMove(items, oldIndex, newIndex);
    }
    callUpdatePage(items)
  }

  return (
   
      <div className="form-page card">
        <div className="form-page__top">
          <div className="form-page__top_item">
            <h2 style={{ color: "red" }}>Page {props.page.id}</h2>
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
          <div className="form-page__top_item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deletePage}
            >
              Delete Page
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
              {props.page.sections.map((section) => {
                return (
                  <PageSection
                    key={section.id}
                    id={section.id}
                    section={section}
                    pageIndex={props.index}
                    page={props.page}
                    data={props.data}
                    operation={performOperation}
                    sensors={sensors}
                    idsMap={props.idsMap}
                  ></PageSection>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
  
  );
};

export default FormPage;
