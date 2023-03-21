import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../Dependency";

const DependencyId = (props) => {
  const handleIdSelection = (e) => {
        console.log("^^^^^^^^^^^handleIdSelection " + e );
        console.log('DependencyId');
        console.log(props);
        let updatedDependency ={...props.dependency}
        let expression = 's.'+e
        let operation = props.dependency.operation
        if (operation) {
            switch(operation){
                case AllowedOperation.IsPresent:
                    expression = '!!'+expression
                    return
                default:
                    expression = 's.'+e+"==="
            }

        }else{
            expression = 's.'+e+"==="
        }
        
        props.update(new DependencyModel(expression))
      };

  const getIdDropDown = () => {
    return (
      <div>
        <DropdownButton
          id="dropdown-basic-button"
          title={props.dependency.id ? props.dependency.id : "--Select--"}
          onSelect={handleIdSelection}
        >
          {Object.keys(props.idsMap).map((id) => {
            return <Dropdown.Item eventKey={id}>{id}</Dropdown.Item>;
          })}
        </DropdownButton>
        <div>{props.dependency.expression}</div>
      </div>
    );
  };
  return <div>{getIdDropDown()}</div>;
};

export default DependencyId;
