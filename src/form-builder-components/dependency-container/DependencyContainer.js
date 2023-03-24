import React, { useEffect, useState } from "react";
import DependencyOperator from "./dependency-operator/DependencyOperator";
import Dependency from "./dependency/Dependency";
import {
  AllowedOperation,
  DependencyExpressionGenerator,
  DependencyExpressionParser,
  DependencyModel,
} from "./dependency/DependencyModel";
import DependencyOperation from "./dependency/dependency-components/dependency-operation/DependencyOperation";
import "./DependencyContainer.css";

export const DependencyContainerLevelOperations = Object.freeze({
  UpdateDependency: Symbol("update_dependency"),
  DeleteDependency: Symbol("update_dependency"),
  UpdateOperator: Symbol("update_operator"),
});

const DependencyContainer = (props) => {
  const [dependencies, setDependencies] = useState([]);
  //   const [operators, setOperators] = useState([])

  useEffect(() => {
    ////console("<<<<<, DependencyContainer");
    if (dependencies.length > 0){/** this is because we have to process the dependencies 1 time only */
      return
    }
    let updatedDependencies = [];
    // //console(
    //   props.form_model.active ? props.form_model.active : "No active"
    // );
    let active = props.form_model.active;
    if (active) {
      active = active.replace("s => ", "");
      active = active.replaceAll("||", "<<<OR>>>");
      active = active.replaceAll("&&", "<<<AND>>>");
      let parts = active.split(/\<<<|\>>>/);
      //console(parts);
      parts.map((part, index) => {
        if (index % 2 == 0) {
          let parsedExpression = new DependencyExpressionParser(part);
          updatedDependencies.push(
            //constructor(id, operation, value, operator, dependencyUUID)
            //constructor(id, operation, value, operator)
            new DependencyModel(
              parsedExpression.id,
              parsedExpression.operation,
              parsedExpression.value,
              parts[index + 1],
              // Date.now()
            )
          );
        }
      });
    }
    setDependencies(updatedDependencies);
  }, [props.form_model]);

  useEffect(() => {
    //console("<<<<<< update dependencies hook");
    //console(dependencies);
    // setDependencies(dependencies);
    updateFormModelIfRequired();
  }, [dependencies]);

  /**
   * add dependency
   */
  const addDependency = () => {
    let updatedDependencies = [...dependencies];
    if (updatedDependencies.length > 0) {
      /**always add AND operator to the 2nd last dependency when anew dependency is added */
      updatedDependencies[updatedDependencies.length - 1].operator = "AND";
    }
    //constructor(id, operation, value, operator, dependencyUUID)
    updatedDependencies.push(new DependencyModel());
    // //console("<<<< addDependency ");
    // //console(updatedDependencies);
    setDependencies(updatedDependencies);
  };

  const updateFormModelIfRequired = () => {
    let operator = null;
    let initialExpression = "s => ";
    let finalExpression = initialExpression;
    dependencies.map((dependency, index) => {
      let isComplete = dependency.isDependencyComplete();
      if (isComplete == true) {
        let expression = dependency.expression(); // new DependencyExpressionGenerator(dependency).expression
        if (expression) {
          if (operator) {
            finalExpression =
              finalExpression + " " + operator + " " + expression;
          } else {
            finalExpression = finalExpression + expression;
          }
        }
        if (expression) {
          operator = dependency.operator ? dependency.operator : operator;
          operator = operator == "OR" ? "||" : "&&";
        }
      } else {
        console.log(
          "<<<< not complete " +
            isComplete +
            " -- " +
            dependency.id +
            dependency.operation +
            dependency.value
        );
      }
    });
    
    if (
      finalExpression !== initialExpression &&
      finalExpression !== props.form_model.active
    ) {
      console.log("<<<<<<<< update form model in form data");
      props.update(finalExpression);
    }
    console.log("$$$$$$ current ");
    console.log(props.form_model.active);
    console.log("@@@@@@@@ new \n" + finalExpression);
  };

  /**
   * update dependency
   */

  const updateDependency = (updatedDependency) => {
    let updatedDependencies = [...dependencies];
    let indexOfUpdatedDependency = -1;
    dependencies.map((dependecy, index) => {
      if (dependecy.dependencyUUID === updatedDependency.dependencyUUID) {
        indexOfUpdatedDependency = index;
      }
    });
    updatedDependencies.splice(indexOfUpdatedDependency, 1, updatedDependency);
    setDependencies(updatedDependencies);
    // updateFormModelIfRequired()
  };

  /**
   * deletes a dependency
   */
  const deleteDependency = (dependency) => {
    //console("<<<< delete dependency at " + dependency.dependencyUUID);
    let updatedDependencies = [...dependencies];
    updatedDependencies = dependencies.filter((d) => {
      return dependency.dependencyUUID != d.dependencyUUID;
    });
    //console(updatedDependencies);
    setDependencies(updatedDependencies);
  };

  const updateOperator = (params) => {
    let dependency = params.dependency;
    let operator = params.updatedOperator;
    let updatedDependencies = [...dependencies];
    updatedDependencies.map((d) => {
      if (dependency.dependencyUUID === d.dependencyUUID) {
        d.operator = operator;
      }
    });
    setDependencies(updatedDependencies);
  };

  const handleChangesInDependency = (operationType, params) => {
    switch (operationType) {
      case DependencyContainerLevelOperations.UpdateDependency:
        //console("update dependency");
        updateDependency(params);
        break;
      case DependencyContainerLevelOperations.DeleteDependency:
        //console("delete dependency");
        deleteDependency(params);
        break;
      case DependencyContainerLevelOperations.UpdateOperator:
        updateOperator(params);
        break;
      default:
        console.error(
          "Unable to handle DependencyContainerLevelOperations" + operationType
        );
    }
  };

  return (
    <div className="dependency-container">
      {dependencies.map((dependency, index) => {
        return (
          <div key={"dependency_container_empty" + index}>
            <Dependency
              key={"dependency" + index}
              data={props.data}
              form_ids_map={props.form_ids_map}
              dependency={dependency}
              index={index}
              operation={handleChangesInDependency}
              formField ={props.formField}
            />
            {dependency.operator ? (
              <DependencyOperator
                key={"dependency_operator" + index}
                dependency={dependency}
                operator={dependency.operator}
                operation={handleChangesInDependency}
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
