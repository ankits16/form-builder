import React, {useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { AllowedOperation, DependencyModel } from "../../DependencyModel";

const DependencyValue = (props) => {
//   useEffect(() => {
//     getAssociatedField();
//   }, [props.data, props.dependency]);

  const getAssociatedField = () => {
    let currentID = props.dependency.id ? props.dependency.id.trim() : "";
    let map = props.form_ids_map[currentID];
    // //console("*************** getAssociatedField " + currentID);
    // //console(props.idsMap);
    if (map) {
      map = map[0];
    //   //console(map);
      map = map.split("::");
      let pageId = map[0];
      let sectionId = map[1];
      let fieldEditorId = map[2];
    //   //console(props);
      let page = props.data.pages.filter((page) => {
        return page.id == pageId;
      })[0];
      let section = page.sections.filter((section) => {
        return section.id == sectionId;
      })[0];

      let field = section.fields.filter((field) => {
        return field.editor_id == fieldEditorId;
      })[0];
    //   //console(map);
    //   //console(
    //     "+++++++++++++++ for field " + field.id + "----- " + currentID
    //   );
    //   //console(field);
      return field;
    } else {
    //   //console("--------------- getAssociatedField " + currentID);
    }

    return null;
  };

  const callUpdateDependency = (val)=>{
    //console(props);
    let currentDependency = {...props.dependency}
    currentDependency.value = val
    props.update(currentDependency);
  }
  
  const handleValueChangeFromDropdown = (e)=>{
    //console('$$$$$$$$$$$ handleValueChangeFromDropdown ');
    //console(e);
    callUpdateDependency(e)  
  }

  const handleValueChangeFromText = (e)=>{
    callUpdateDependency(e.target.value)  
  }

  const getValuesDropDown = (options) => {
    return props.dependency.operation === AllowedOperation.IsPresent ? (
      ""
    ) : (
      <DropdownButton
      key={'d_dv_dd'+props.index}
        id="dropdown-basic-button"
        title={props.dependency.value ? props.dependency.value : "--Select--"}
        onSelect={handleValueChangeFromDropdown}
      >
        {options.map((option, index) => {
          return (
            <Dropdown.Item key={'d_dv_dd_item'+index} eventKey={option.value}>{option.value}</Dropdown.Item>
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
    //   //console(field);
    let options = field.options;
    if (options && options.length > 0) {
      return getValuesDropDown(field.options);
    } 
    }
    return <input value={props.dependency.value ? props.dependency.value :  ''} onChange={handleValueChangeFromText}></input>;
  };

  return <div>{getControlForValue()}</div>;
};

export default DependencyValue;
