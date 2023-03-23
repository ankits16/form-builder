import React from "react";
import { Accordion } from "react-bootstrap";

const ImageAttribute = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Image Capture</Accordion.Header>
        <Accordion.Body>
          <div>Image Capture Attributes goes here</div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ImageAttribute;
