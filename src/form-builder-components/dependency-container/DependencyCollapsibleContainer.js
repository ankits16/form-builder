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
              idsMap={props.idsMap}
              data={props.data}
              form_model={props.form_model}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DependencyCollapsibleContainer;
