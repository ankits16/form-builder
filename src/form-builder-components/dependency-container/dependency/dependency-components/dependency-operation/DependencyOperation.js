import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../DependencyModel";

const DependencyOperation = (props) => {
  const handleOperationSelection = (e) => {
    // //console("handleIdSelection " + e);
    // //console("~~~~~~~~~~DependencyOperation");
    // //console(props.dependency);
    let currentDependency = {...props.dependency}
    let previousOperation = currentDependency.operation
    currentDependency.operation = e === 'IsPresent' ? AllowedOperation.IsPresent : AllowedOperation.Equals
    props.update(currentDependency);
  };

  const getOperationLabel = (operation) => {
    switch (operation) {
      case AllowedOperation.Equals:
        return "Equals";
      case AllowedOperation.IsPresent:
        return "IsPresent";
      default:
        return operation;
    }
  };
  const getOperationsDown = () => {
    return (
      <DropdownButton
      key={'d_do_dd'+Date.now()}
        id="dropdown-basic-button"
        title={
          props.dependency.operation
            ? getOperationLabel(props.dependency.operation)
            : "--Select--"
        }
        onSelect={handleOperationSelection}
      >
        {Object.keys(AllowedOperation).map((id, index) => {
          return <Dropdown.Item  key={'d_do_dd_item'+index} eventKey={id}>{id}</Dropdown.Item>;
        })}
      </DropdownButton>
    );
  };
  return <div>{getOperationsDown()}</div>;
};

export default DependencyOperation;
