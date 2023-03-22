import React, { useEffect, useState } from "react";

import "./DependencyOperator.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DependencyOperator = (props) => {
  const operations = ["AND", "OR"];
  // console.log('???????? DependencyOperator')
  // console.log(operations.indexOf(props.operator))
  // console.log('YYYYYYYYYY DependencyOperator')

  
  const [currentOperation, setCurrentOperation] = useState(
    operations.indexOf(props.operator) === -1
      ? 0
      : operations.indexOf(props.operator)
  );

  useEffect(()=>{
    let c =operations.indexOf(props.operator) === -1
      ? 0
      : operations.indexOf(props.operator)
    setCurrentOperation(c)
  }, [props.operator])

  const handleChange = (val) => {
    console.log(val);
    props.update(props.index, val)
    // setCurrentOperation(val);
  };

  return (
    <div className="operator-container">
      <DropdownButton
        id="dropdown-basic-button"
        title={operations[currentOperation]}
        onSelect={handleChange}
        key={'dependency_operator_dd'+Date.now()}
      >
        {operations.map((id, index) => {
          return <Dropdown.Item  key={'dependency_operator_dd_item' +index} eventKey={index}>{id}</Dropdown.Item>;
        })}
      </DropdownButton>
    </div>
  );
};

export default DependencyOperator;
