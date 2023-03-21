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
  parseString() {
    if (this.rawDependency.includes(AllowedOperation.Equals)) {
      this.id = this.parts[0];
    }
    if (this.rawDependency.includes(AllowedOperation.IsPresent)) {
      this.id = this.parts[1];
    }

    if (this.rawDependency.includes(AllowedOperation.Equals)) {
      this.operation = "Equals";
    }
    if (this.rawDependency.includes(AllowedOperation.IsPresent)) {
      this.operation = "IsPresent";
    }
    //   this.operation = "operation";

    if (this.rawDependency.includes(AllowedOperation.Equals)) {
      this.value = this.parts[1];
    }
    if (this.rawDependency.includes(AllowedOperation.IsPresent)) {
      this.value = "";
    }
  }

  constructor(rawDependency) {
    if (typeof rawDependency === "string" && rawDependency !== null) {
      this.rawDependency = rawDependency ? rawDependency.replace("s.", "") : "";
      this.parts = this.rawDependency.split(/\===|\!!/);
      this.parseString();
    }
    if (typeof rawDependency === "object" && rawDependency !== null) {
      this.rawDependency = rawDependency;
    }
  }
}

const Dependency = (props) => {
    const [currentDependency, setCurrentDependency] = useState(props.dependency)
  const updateDependency = (updatedDependency) => {
    setCurrentDependency(updatedDependency)
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
