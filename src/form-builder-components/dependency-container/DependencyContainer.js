import React, { useEffect, useState } from "react";
import DependencyOperator from "./dependency-operator/DependencyOperator";
import Dependency, { DependencyModel } from "./dependency/Dependency";
import DependencyOperation from "./dependency/dependency-components/dependency-operation/DependencyOperation";
import "./DependencyContainer.css";
const DependencyContainer = (props) => {
  const [dependencies, setDependencies] = useState([]);
  //   const [operators, setOperators] = useState([])

  useEffect(() => {
    console.log("<<<<<, DependencyContainer");
    let updatedDependencies = [];
    console.log(
      props.form_model.active ? props.form_model.active : "No active"
    );
    let active = props.form_model.active;
    if (active) {
      active = active.replace("s => ", "");
      active = active.replace("||", "<<<OR>>>");
      active = active.replace("&&", "<<<AND>>>");
      let parts = active.split(/\<<<|\>>>/);
      console.log(parts);
      parts.map((part, index) => {
        if (index % 2 == 0) {
          updatedDependencies.push(
            new DependencyModel(part, parts[index + 1], Date.now())
          );
        }
      });
    }
    setDependencies(updatedDependencies);
  }, [props.form_model]);

  //   useEffect(() => {
  //     console.log("<<<<<< update dependencies hook");
  //     console.log(dependencies);
  //     // setDependencies(dependencies);
  //   }, [dependencies]);

  /**
   * add dependency
   */
  const addDependency = () => {
    let updatedDependencies = [...dependencies];
    if (updatedDependencies.length > 0) {
      /**always add AND operator to the 2nd last dependency when anew dependency is added */
      updatedDependencies[updatedDependencies.length - 1].operator = "AND";
    }

    updatedDependencies.push(new DependencyModel(null, null, Date.now()));
    console.log("<<<< addDependency ");
    console.log(updatedDependencies);
    setDependencies(updatedDependencies);
  };

  /**
   * deletes a dependency
   */
  const deleteDependency = (dependency) => {
    console.log("<<<< delete dependency at " + dependency.dependencyUUID);
    let updatedDependencies = [...dependencies];
    updatedDependencies = dependencies.filter((d) => {
      return dependency.dependencyUUID != d.dependencyUUID;
    });
    console.log(updatedDependencies);
    setDependencies(updatedDependencies);
  };

  const updateOperator = (index, operator) => {
    console.log("######## update operator at " + index + "with " + operator);
    let updatedDependencies = [...dependencies];
    updatedDependencies[index].operator = operator === 0 ? "AND" : "OR";
    // updatedOperations[index] = operator === 0 ?'AND' : 'OR'
    setDependencies(updatedDependencies);
  };
  return (
    <div className="dependency-container">
      {dependencies.map((dependency, index) => {
        return (
          <div key={"empty" + index}>
            <Dependency
              key={"dependency" + index}
              data={props.data}
              form_ids_map={props.form_ids_map}
              dependency={dependency}
              delete={deleteDependency}
              index={index}
            />
            {dependency.operator ? (
              <DependencyOperator
                key={"dependency_operator" + index}
                operator={dependency.operator}
                index={index}
                update={updateOperator}
              />
            ) : (
              <></>
            )}
          </div>
        );
      })}
      <button className="btn-primary" onClick={addDependency}>
        Add Dependency
      </button>
    </div>
  );
};

export default DependencyContainer;
