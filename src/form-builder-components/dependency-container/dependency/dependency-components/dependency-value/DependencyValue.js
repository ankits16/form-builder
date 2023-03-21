import React, {useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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

  const getValuesDropDown = (options) => {
    return props.dependency.operation === "IsPresent" ? (
      ""
    ) : (
      <DropdownButton
        id="dropdown-basic-button"
        title={props.dependency.value ? props.dependency.value : "--Select--"}
      >
        {options.map((option) => {
          return (
            <Dropdown.Item>{option.value}</Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  };

  const getControlForValue = () => {
    if (props.dependency.operation === "IsPresent") {
      return <></>;
    }
    let field = getAssociatedField();
    if (field) {
    //   console.log(field);
      if (field.type === "text") {
        return <input></input>;
      } else {
        let options = field.options;
        if (options && options.length > 0) {
          return getValuesDropDown(field.options);
        } else {
          return <input></input>;
        }
      }
    } else {
      return <input></input>;
    }
  };

  return <div>{getControlForValue()}</div>;
};

export default DependencyValue;
