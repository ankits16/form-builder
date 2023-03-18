import React from "react";
import { Accordion } from "react-bootstrap";
import { FormFieldLevelOperation } from "../../FormField";
import OptionOptions from "./OptionOptions/OptionOptions";
import SelectOptions from "./SelectOptions/SelectOptions";

export const OptionsType = Object.freeze({
  SelectOptions: "select",
  OptionOptions: "options",
});

export const OptionLevelOperation = Object.freeze({
  DeleteOption: Symbol("deleteOption"),
  UpdateOption: Symbol("updateOption"),
});

const OptionsFieldsAttribute = (props) => {
  const handleChangeInOption = (operationType, impactedOption) => {
    switch (operationType) {
      case OptionLevelOperation.UpdateOption:
        updateOption(impactedOption);
        break;
      case OptionLevelOperation.DeleteOption:
        deleteOption(impactedOption)
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
    console.log('<<<<<<<< delete ' + optionId)
    let updatedOptions = [...props.field.options]
    updatedOptions = updatedOptions.filter((option)=>{
        return option.id !== optionId
    })
    updatedOptions.map((option, index)=>{
        option.id = index
    })
    props.operation(FormFieldLevelOperation.UpdateFieldAttribute, {
        options: updatedOptions,
      });
  };

  return (
    <div className="col-11" style={{ minWidth: 190 }}>
      <Accordion >
        <Accordion.Item eventKey="0">
          <Accordion.Header >Options</Accordion.Header>
          <Accordion.Body>
            <div>
              {props.field.options.map((option) => {
                return getOptions(option);
              })}
              <div>
                <button onClick={handleAddOption}>Add Option</button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OptionsFieldsAttribute;
