import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../Dependency";

const DependencyOperation = (props) => {
  const handleOperationSelection = (e) => {
    console.log("handleIdSelection " + e);
    console.log("~~~~~~~~~~DependencyOperation");
    console.log(props);
    let currentDependency = props.dependency
    let id = props.dependency.id
    let expression = "s." + id;
    let operation = e === 'IsPresent' ? '!!' : '===';
    console.log('operation is ' + operation);
    if (operation) {
      switch (operation) {
        case AllowedOperation.IsPresent:
          expression = "!!" + expression;
          break;
        default:
          expression = expression + "===";
      }
    } else {
      expression = expression + "===";
    }
    console.log('expression is ' + expression);
    console.log("~~~~~~~~~~ End DependencyOperation");
    props.update(new DependencyModel(expression, currentDependency.operator, currentDependency.dependencyUUID));
  };

  const getOperationLabel = (operation) => {
    switch (operation) {
      case AllowedOperation.Equals:
        return "EQUALS";
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
