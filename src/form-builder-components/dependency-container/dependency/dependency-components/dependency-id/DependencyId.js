import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DependencyId = (props) => {

    const handleIdSelection = (e) => {
        console.log("handleIdSelection " + e );
        console.log('DependencyId');
        console.log(props);
        let updatedDependency ={...props.dependency}
        updatedDependency['id'] = e
        props.update(updatedDependency)
      };

    const getIdDropDown = () => {
        return (
          <DropdownButton
            id="dropdown-basic-button"
            title={props.dependency.id ? props.dependency.id : "--Select--"}
            onSelect={handleIdSelection}
          >
            {Object.keys(props.idsMap).map((id) => {
              return (
                <Dropdown.Item eventKey={id}>
                  {id}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        );
      };
  return (
    <div>
      {getIdDropDown()}
    </div>
  )
}

export default DependencyId
