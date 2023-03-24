import React, { useEffect, useState } from "react";
import "./Dependency.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DependencyId from "./dependency-components/dependency-id/DependencyId";
import DependencyOperation from "./dependency-components/dependency-operation/DependencyOperation";
import DependencyValue from "./dependency-components/dependency-value/DependencyValue";
import { MdDragIndicator, MdDelete } from "react-icons/md";
import { DependencyContainerLevelOperations } from "../DependencyContainer";



const Dependency = (props) => {
    // //console('@@@@@@@ Dependency ' + props.dependency.id + ' index = ' + props.index)
    // //console(props.dependency)
    // //console('@@@@@@@ End Dependency ' + props.dependency.id)
//   const [currentDependency, setCurrentDependency] = useState(props.dependency);

  const updateDependency = (updatedDependency) => {
    // //console("======== updateDependency ");
    // //console(updatedDependency);
    props.operation(DependencyContainerLevelOperations.UpdateDependency, updatedDependency)
    // setCurrentDependency(updatedDependency);
  };

//   useEffect(()=>{
//     setCurrentDependency(props.dependency);
//   }, [props.dependency])

  const handleDependencyDeletion = () => {
    // props.delete(props.dependency)
    props.operation(DependencyContainerLevelOperations.DeleteDependency, props.dependency)
  };

  //console('~~~~~~~ depenency id key ' + 'd_id_'+props.dependency.dependencyUUID)
  return (
    <div className="dependency">
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyId
            key= {'d_id_'+props.dependency.dependencyUUID}
          data={props.data}
          form_ids_map={props.form_ids_map}
          dependency={props.dependency}
          update={updateDependency}
          index={props.index}
          operation={props.operation}
          formField ={props.formField}
        />
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyOperation
         key={'d_operation_'+props.dependency.dependencyUUID}
          dependency={props.dependency}
          update={updateDependency}
        />
        {/* {getOperationsDown()} */}
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyValue
          key={'d_value_'+props.dependency.dependencyUUID}
          dependency={props.dependency}
          data={props.data}
          form_ids_map={props.form_ids_map}
          update={updateDependency}
          index={props.index}
        />
      </div>
      <div className="dependency-delete-item">
        <button className="btn" onClick={handleDependencyDeletion}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Dependency;
