import React from "react";
import "./OptionOptions.css";
import { MdOutlineDragIndicator, MdDelete } from "react-icons/md";
import { OptionLevelOperation } from "../OptionsFieldsAttribute";

const OptionOptions = (props) => {
  const handleValueChange = (event) => {
    let updatedOption = { ...props.option };
    updatedOption.value = event.target.value;
    props.operation(OptionLevelOperation.UpdateOption, updatedOption);
  };

  const handleLabelChange = (event) => {
    let updatedOption = { ...props.option };
    updatedOption.label = event.target.value;
    props.operation(OptionLevelOperation.UpdateOption, updatedOption);
  };

  const handleClassChange = (event) => {
    let updatedOption = { ...props.option };
    updatedOption.class = event.target.value;
    props.operation(OptionLevelOperation.UpdateOption, updatedOption);
  };

  const handleOptionDelete = () => {
    props.operation(OptionLevelOperation.DeleteOption, props.option.id);
  };

  return (
    <div className="options-option-container">
      <div className="options-option-item">
        <button className="btn">
          <MdOutlineDragIndicator />
        </button>
      </div>

      <div className="options-option-item">
        <div>value</div>
        <div>
          <input
            value={props.option.value}
            onChange={handleValueChange}
          ></input>
        </div>
      </div>
      <div className="options-option-item">
        <div>Label</div>
        <div>
          <input
            value={props.option.label}
            onChange={handleLabelChange}
          ></input>
        </div>
      </div>
      <div className="options-option-item">
        <div>class</div>
        <div>
          <input
            value={props.option.class}
            onChange={handleClassChange}
          ></input>
        </div>
      </div>
      <div className="options-option-item">
        <button className="btn" onClick={handleOptionDelete}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default OptionOptions;
