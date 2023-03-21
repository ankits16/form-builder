import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation } from '../../Dependency';


const DependencyOperation = (props) => {
    const handleOperationSelection = (e)=>{
        console.log("handleIdSelection " + e );
        console.log('~~~~~~~~~~DependencyOperation');
        console.log(props);
        let updatedDependency ={...props.dependency}
        updatedDependency['operation'] = e
        props.update(updatedDependency)
    }
    const getOperationsDown = () => {
        return (
          <DropdownButton
            id="dropdown-basic-button"
            title={
                props.dependency.operation
                ? props.dependency.operation
                : "--Select--"
            }
            onSelect={handleOperationSelection}
          >
            {Object.keys(AllowedOperation).map((id) => {
              return <Dropdown.Item eventKey={id}>{id}</Dropdown.Item>;
            })}
          </DropdownButton>
        );
      };
  return (
    <div>
      {getOperationsDown()}
    </div>
  )
}

export default DependencyOperation
