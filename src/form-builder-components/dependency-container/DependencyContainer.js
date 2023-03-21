import React, { useEffect, useState } from "react";
import DependencyOperator from "./dependency-operator/DependencyOperator";
import Dependency, { DependencyModel } from "./dependency/Dependency";
import DependencyOperation from "./dependency/dependency-components/dependency-operation/DependencyOperation";
import "./DependencyContainer.css";
const DependencyContainer = (props) => {
  const [dependencies, setDependencies] = useState([]);
  const [operators, setOperators] = useState([])

  useEffect(() => {
    console.log("<<<<<, DependencyContainer");
    let updatedDependencies = [];
    let updatedOperators = []
    console.log(
      props.form_model.active ? props.form_model.active : "No active"
    );
    let active = props.form_model.active;
    if (active) {
      active = active.replace("s => ", "");
      active = active.replace('||', '<<<OR>>>')
      active = active.replace('&&', '<<<AND>>>')
      let parts = active.split(/\<<<|\>>>/);
      console.log(parts);
      parts.map((part, index) => {
        
        if ((index %2) == 0){
            updatedDependencies.push(new DependencyModel(part, parts[index + 1]));
        }
        
      });
    }
    setDependencies(updatedDependencies);
    setOperators(updatedOperators);
  }, [props.form_model]);

  const addDependency = () => {
    let updatedDependencies = [...dependencies];
    if (updatedDependencies.length > 0){
        updatedDependencies[updatedDependencies.length -1].operator = 'AND' 
    }
    
    updatedDependencies.push(new DependencyModel());
    setDependencies(updatedDependencies);
  };

  const DeleteDependency = () => {};

  const updateOperator = (index, operator)=>{
    console.log('######## update operator at ' + index + 'with ' + operator)
    let updatedDependencies = [...dependencies];
    updatedDependencies[index].operator = operator === 0 ?'AND' : 'OR'
    // updatedOperations[index] = operator === 0 ?'AND' : 'OR'
    setDependencies(updatedDependencies);
  }
  return (
    <div className="dependency-container">
      {dependencies.map((dependency, index) => {
        return (
          <div>
            <Dependency
            key={index}
              data={props.data}
              idsMap={props.idsMap}
              dependency={dependency}
            />
            {dependency.operator? <DependencyOperator operator={dependency.operator} index={index} update={updateOperator}/> : ''}
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
