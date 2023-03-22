import React, { useEffect, useState } from "react";
import "./Dependency.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DependencyId from "./dependency-components/dependency-id/DependencyId";
import DependencyOperation from "./dependency-components/dependency-operation/DependencyOperation";
import DependencyValue from "./dependency-components/dependency-value/DependencyValue";
import { MdDragIndicator, MdDelete } from "react-icons/md";

export const AllowedOperation = Object.freeze({
  Equals: "===",
  IsPresent: "!!",
});
export class DependencyModel {
  constructor(expression, operator, dependencyUUID) {
    this.dependencyUUID = dependencyUUID
    this.expression = expression;
    this.refresh();
    this.operator = operator;
    console.log("<<<<<<<< initializing DependencyModel ");
    Object.keys(this).map((key) => {
      console.log(key + " = " + this[key]);
    });
    // console.log('<<<<<<<< initializing DependencyModel ' + expression + 'with operator '+ operator + ' operation ' + this.operation)
    console.log("<<<<<<<< end DependencyModel ");
  }

  refresh() {
    console.log(
      "<<<<<<<< initializing DependencyModel  refresh " + this.expression
    );
    this.id = this.getId();
    this.operation = this.getOperation();
    this.value = this.getvalue();
  }

  getOperation() {
    if (this.expression && this.expression.includes("===")) {
      return AllowedOperation.Equals;
    }

    if (this.expression && this.expression.includes("!!")) {
      return AllowedOperation.IsPresent;
    }
    return AllowedOperation.Equals;
  }

  getvalue() {
    if (this.expression && this.expression.includes("===")) {
      return this.expression.split("===")[1].trim();
    }

    if (this.expression && this.expression.includes("!!")) {
      return null;
    }
    return null;
  }

  getId() {
    if (this.expression && this.expression.includes("===")) {
      return this.expression.split("===")[0].trim().replace("s.", "");
    }

    if (this.expression && this.expression.includes("!!")) {
      return this.expression.trim().replace("!!s.", "");
    }
    return this.expression;
  }
}

const Dependency = (props) => {
    console.log('@@@@@@@ Dependency ' + props.dependency.id + ' index = ' + props.index)
    console.log(props.dependency)
    console.log('@@@@@@@ End Dependency ' + props.dependency.id)
  const [currentDependency, setCurrentDependency] = useState(props.dependency);

  const updateDependency = (updatedDependency) => {
    console.log("======== updateDependency ");
    console.log(updatedDependency);
    setCurrentDependency(updatedDependency);
  };

//   useEffect(()=>{
//     setCurrentDependency(props.dependency);
//   }, [props.dependency])

  const handleDependencyDeletion = () => {
    props.delete(props.dependency)
  };

  console.log('~~~~~~~ depenency id key ' + 'd_id_'+props.dependency.dependencyUUID)
  return (
    <div className="dependency">
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyId
            key= {'d_id_'+props.dependency.dependencyUUID}
          data={props.data}
          form_ids_map={props.form_ids_map}
          dependency={currentDependency}
          update={updateDependency}
          index={props.index}
        />
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyOperation
         key={'d_operation_'+props.dependency.dependencyUUID}
          dependency={currentDependency}
          update={updateDependency}
        />
        {/* {getOperationsDown()} */}
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyValue
          key={'d_value_'+props.dependency.dependencyUUID}
          dependency={currentDependency}
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
