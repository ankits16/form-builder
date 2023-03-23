import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import './ImageAttribute.css'

const ImageAttribute = (props) => {
  const defaultAttributes = {
    max: 10,
  };
  
  const displayLabels = {
    max: "Maximum number of images",
  };

  const [currentImageAttributes, setCurrentImageAttributes] = useState(
    props.imageAttributes ? props.imageAttributes : defaultAttributes
  );

  const handleInput = (e) => {
    let key = e.target.id;
    let updatedAttributes = { ...currentImageAttributes };
    updatedAttributes[key] = e.target.value;
    console.log(updatedAttributes);
    setCurrentImageAttributes(updatedAttributes);
    props.update('imageCapture', updatedAttributes)
  };
  const getMaxImageInput = () => {
    return (
      <div key ={'ia_md_'+props.index} className="image-attribute-item">
        <div className="image-attribute-item-key">
          {displayLabels.max}
        </div>
        <div className="image-attribute-item-value">
          <input
            id={"max"}
            value={currentImageAttributes.max}
            onChange={handleInput}
          ></input>
        </div>
      </div>
    );
  };

  const getAttributeForKey = (key) => {

    switch (key) {
        case "max":
            return getMaxImageInput()
        default:
        return < div key={'empty_'+key+Date.now()}></div>;
    }
  };
  return (
    <Accordion >
      <Accordion.Item>
        <Accordion.Header>Image Capture</Accordion.Header>
        <Accordion.Body>
        {Object.keys(currentImageAttributes).map((key) => {
            return getAttributeForKey(key);
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ImageAttribute;
