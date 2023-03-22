import React, { useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../DependencyModel";
// import { AllowedOperation, DependencyModel } from "../../Dependency";

const DependencyId = (props) => {
  console.log(
    "############ DependencyId " +
      props.dependency.id +
      " index = " +
      props.index
  );
  console.log(props.dependency);
  console.log("############ End DependencyId " + props.dependency.id);

  const handleIdSelection = (e) => {
    console.log("^^^^^^^^^^^handleIdSelection " + e);
    console.log("DependencyId");
    console.log(props);
    let currentDependency = { ...props.dependency };
    currentDependency.id = e;
    currentDependency.value = null
    props.update(currentDependency);
  };

  const getIdDropDown = () => {
    return (
      <>
        <DropdownButton
          id="dropdown-basic-button"
          title={props.dependency.id ? props.dependency.id : "--Select--"}
          onSelect={handleIdSelection}
          key={"d_id_dd" + Date.now()}
        >
          {Object.keys(props.form_ids_map).map((id, index) => {
            return (
              <Dropdown.Item key={"d_id_dd_item" + index} eventKey={id}>
                {id}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <div>{props.dependency.expression}</div>
      </>
    );
  };
  return <div>{getIdDropDown()}</div>;
};

export default DependencyId;
