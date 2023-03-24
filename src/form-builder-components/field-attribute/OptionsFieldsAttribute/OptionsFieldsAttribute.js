import React from "react";
import { Accordion } from "react-bootstrap";
import { FormFieldLevelOperation } from "../../form-field/FormField";
import OptionOptions from "./OptionOptions/OptionOptions";
import SelectOptions from "./SelectOptions/SelectOptions";

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

export const OptionsType = Object.freeze({
  SelectOptions: "select",
  OptionOptions: "options",
});

export const OptionLevelOperation = Object.freeze({
  DeleteOption: Symbol("deleteOption"),
  UpdateOption: Symbol("updateOption"),
});

const OptionsFieldsAttribute = (props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChangeInOption = (operationType, impactedOption) => {
    switch (operationType) {
      case OptionLevelOperation.UpdateOption:
        updateOption(impactedOption);
        break;
      case OptionLevelOperation.DeleteOption:
        deleteOption(impactedOption);
        break;
      default:
        console.error("Unidentified OptionLevelOperation " + operationType);
    }
  };
  const getSelectOptions = (option) => {
    return (
      <SelectOptions
        key={option.id}
        option={option}
        operation={handleChangeInOption}
      />
    );
  };
  const getOptionOptions = (option) => {
    return (
      <OptionOptions
        key={option.id}
        option={option}
        operation={handleChangeInOption}
      />
    );
  };

  const getOptions = (option) => {
    switch (props.field.type) {
      case OptionsType.SelectOptions:
        return getSelectOptions(option);
      case OptionsType.OptionOptions:
        return getOptionOptions(option);
      default:
        console.error("Unidentified options for field " + props.field.type);
    }
  };

  const handleAddOption = () => {
    let updatedOptions = [...props.field.options];
    let optionId = updatedOptions.length + 1;
    updatedOptions.push({ id: optionId, value: "" });
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      options: updatedOptions,
    });
  };

  const updateOption = (impactedOption) => {
    let updatedOptions = [];
    props.field.options.map((option) => {
      if (option.id === impactedOption.id) {
        updatedOptions.push(impactedOption);
      } else {
        updatedOptions.push(option);
      }
    });
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      options: updatedOptions,
    });
  };

  const deleteOption = (optionId) => {
    //console("<<<<<<<< delete " + optionId);
    let updatedOptions = [...props.field.options];
    updatedOptions = updatedOptions.filter((option) => {
      return option.id !== optionId;
    });
    updatedOptions.map((option, index) => {
      option.id = index;
    });
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      options: updatedOptions,
    });
  };

  const onOptionDragEnd = (event) => {
    const { active, over } = event;
    let updatedOptions = [...props.field.options];
    let oldIndex = -1;
    let newIndex = -1;
    updatedOptions.map((option, index)=>{
        if (option.id === active.id){
            oldIndex = index
        } 
        if (option.id === over.id){
            newIndex = index
        }
    })
    updatedOptions = arrayMove(updatedOptions, oldIndex, newIndex);
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
      options: updatedOptions,
    });
  };

  return (
    <div className="col-11" style={{ minWidth: 190 }}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Options</Accordion.Header>
          <Accordion.Body>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onOptionDragEnd}
            >
              <SortableContext
                items={props.field.options}
                strategy={verticalListSortingStrategy}
              >
                {props.field.options.map((option) => {
                  return getOptions(option);
                })}
                <div>
                  <button onClick={handleAddOption}>Add Option</button>
                </div>
              </SortableContext>
            </DndContext>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OptionsFieldsAttribute;
