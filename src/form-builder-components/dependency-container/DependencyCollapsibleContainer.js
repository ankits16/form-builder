import React from "react";
import Accordion from "react-bootstrap/Accordion";
import DependencyContainer from "./DependencyContainer";

const DependencyCollapsibleContainer = (props) => {
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Dependencies</Accordion.Header>
          <Accordion.Body>
            <DependencyContainer
              key={'dependency_container'+props.index} //just to keep it unique can change it later
              form_ids_map={props.form_ids_map}
              data={props.data}
              form_model={props.form_model}
              update={props.update}
              formField ={props.formField}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DependencyCollapsibleContainer;
