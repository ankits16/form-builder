import React, { useState } from "react";
import "./Dependency.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DependencyId from "./dependency-components/dependency-id/DependencyId";
import DependencyOperation from "./dependency-components/dependency-operation/DependencyOperation";
import DependencyValue from "./dependency-components/dependency-value/DependencyValue";

export const AllowedOperation = Object.freeze({
  Equals: "===",
  IsPresent: "!!",
});
export class DependencyModel {
  constructor(expression, operator) {
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
  const [currentDependency, setCurrentDependency] = useState(props.dependency);
  const updateDependency = (updatedDependency) => {
    console.log("======== updateDependency ");
    console.log(updatedDependency);
    setCurrentDependency(updatedDependency);
  };

  return (
    <div className="dependency">
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyId
          data={props.data}
          idsMap={props.idsMap}
          dependency={currentDependency}
          update={updateDependency}
        />
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyOperation
          dependency={currentDependency}
          update={updateDependency}
        />
        {/* {getOperationsDown()} */}
      </div>
      <div className="dependency-item" style={{ background: "yellow" }}>
        <DependencyValue
          key={props.key}
          dependency={currentDependency}
          data={props.data}
          idsMap={props.idsMap}
          update={updateDependency}
        />
      </div>
    </div>
  );
};

export default Dependency;
