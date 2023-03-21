import React, {useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../Dependency";

const DependencyValue = (props) => {
  useEffect(() => {
    getAssociatedField();
  }, [props.data, props.dependency]);

  const getAssociatedField = () => {
    let currentID = props.dependency.id ? props.dependency.id.trim() : "";
    let map = props.idsMap[currentID];
    // console.log("*************** getAssociatedField " + currentID);
    // console.log(props.idsMap);
    if (map) {
      map = map[0];
    //   console.log(map);
      map = map.split("::");
      let pageId = map[0];
      let sectionId = map[1];
      let fieldEditorId = map[2];
    //   console.log(props);
      let page = props.data.pages.filter((page) => {
        return page.id == pageId;
      })[0];
      let section = page.sections.filter((section) => {
        return section.id == sectionId;
      })[0];

      let field = section.fields.filter((field) => {
        return field.editor_id == fieldEditorId;
      })[0];
    //   console.log(map);
    //   console.log(
    //     "+++++++++++++++ for field " + field.id + "----- " + currentID
    //   );
    //   console.log(field);
      return field;
    } else {
    //   console.log("--------------- getAssociatedField " + currentID);
    }

    return null;
  };

  const calUpdateDependency = (val)=>{
    console.log(props);
    let updatedDependency = { ...props.dependency };
    let id = props.dependency.id
    let expression = "s." + id;
    
    // let operation = props.dependency.operation === AllowedOperation ? '!!' : '===';
    console.log('operation is ' + props.dependency.operation);
    if (props.dependency.operation) {
      switch (props.dependency.operation) {
        case AllowedOperation.IsPresent:
          expression = "!!" + expression;
          break;
        default:
          expression = expression + "===" + val;
      }
    } else {
      expression = expression + "==="+ val;
    }
    console.log('expression is ' + expression);
    console.log("~~~~~~~~~~ End DependencyOperation");
    props.update(new DependencyModel(expression));
  }
  
  const handleValueChangeFromDropdown = (e)=>{
    console.log('$$$$$$$$$$$ handleValueChangeFromDropdown ');
    console.log(e);
    calUpdateDependency(e)  
  }

  const handleValueChangeFromText = (e)=>{
    calUpdateDependency(e.target.value)  
  }

  const getValuesDropDown = (options) => {
    return props.dependency.operation === AllowedOperation.IsPresent ? (
      ""
    ) : (
      <DropdownButton
        id="dropdown-basic-button"
        title={props.dependency.value ? props.dependency.value : "--Select--"}
        onSelect={handleValueChangeFromDropdown}
      >
        {options.map((option) => {
          return (
            <Dropdown.Item eventKey={option.value}>{option.value}</Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  };

  const getControlForValue = () => {
    if (props.dependency.operation === AllowedOperation.IsPresent) {
      return <></>;
    }
    let field = getAssociatedField();
    if (field) {
    //   console.log(field);
      if (field.type === "text") {
        return <input onChange={handleValueChangeFromText}></input>;
      } else {
        let options = field.options;
        if (options && options.length > 0) {
          return getValuesDropDown(field.options);
        } else {
          return <input onChange={handleValueChangeFromText}></input>;
        }
      }
    } else {
      return <input onChange={handleValueChangeFromText}></input>;
    }
  };

  return <div>{getControlForValue()}</div>;
};

export default DependencyValue;
