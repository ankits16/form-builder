import React, { useState } from "react";
import { Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import "./VideoAttribute.css";

const VideoAttribute = (props) => {
  const defaultAttributes = {
    acceptMedia: "vyn.AcceptMediaTypes.AudioVideo",
    acceptMediaOptions: [
      "vyn.AcceptMediaTypes.AudioVideo",
      "vyn.AcceptMediaTypes.Video",
    ],
    canPause: false,
    maxDuration: 20000,
    width: 640,
    height: 480,
    facingMode: "vyn.FacingModes.Front",
    capture_label: "'Record a video showing surroundin'",
  };
  const displayLabels = {
    acceptMediaOptions: "Media type",
    canPause: "Allow pause",
    maxDuration: "Maximum duration",
    width: "Width",
    height: "Height",
    facingMode: "Camera type",
    capture_label: "Capture label",
  };

  const [currentVideoAttributes, setCurrentVideoAttributes] = useState(
    props.videoAttributes ? props.videoAttributes : defaultAttributes
  );

  const displayableMediaTypeLabels = {
    "vyn.AcceptMediaTypes.AudioVideo": "Audio & Video",
    "vyn.AcceptMediaTypes.Video": "Video Only",
  };

  const handleMediaTypeSelection = (e) => {
    //console(e)
    let updatedAttriutes = { ...currentVideoAttributes };
    updatedAttriutes.acceptMedia = e;
    setCurrentVideoAttributes(updatedAttriutes);
    props.update("videoCapture", updatedAttriutes);
  };
  const getMediaTypePicker = () => {
    let key = currentVideoAttributes.acceptMedia;
    let title = displayableMediaTypeLabels[key];
    return (
      <div key={"va_mt_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">
          {displayLabels.acceptMediaOptions}
        </div>
        <div className="video-attribute-item-value">
          <DropdownButton
            id="dropdown-basic-button"
            title={title}
            onSelect={handleMediaTypeSelection}
            key={"va_media_type_dd" + props.index}
          >
            {currentVideoAttributes.acceptMediaOptions.map((id, index) => {
              return (
                <Dropdown.Item
                  key={"va_media_type_dd_item" + index}
                  eventKey={id}
                >
                  {displayableMediaTypeLabels[id]}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </div>
    );
  };

  const handleCanPauseSelection = (e) => {
    //console(e)
    let updatedAttriutes = { ...currentVideoAttributes };
    updatedAttriutes.canPause = e == 0 ? true : false;
    setCurrentVideoAttributes(updatedAttriutes);
    props.update("videoCapture", updatedAttriutes);
  };

  const canPause = ["True", "False"];
  const getCanPausePicker = () => {
    return (
      <div key={"va_cp_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">{displayLabels.canPause}</div>
        <div className="video-attribute-item-value">
          <DropdownButton
            id="dropdown-basic-button"
            title={currentVideoAttributes.canPause === true ? "True" : "False"}
            onSelect={handleCanPauseSelection}
            key={"va_media_type_dd" + props.index}
          >
            {canPause.map((id, index) => {
              return (
                <Dropdown.Item
                  key={"va_media_type_dd_item" + index}
                  eventKey={index}
                >
                  {id}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </div>
    );
  };

  const handleInput = (e) => {
    //console(e.target.id);
    let key = e.target.id;
    let updatedAttributes = { ...currentVideoAttributes };
    updatedAttributes[key] = e.target.value;
    //console(updatedAttributes);
    setCurrentVideoAttributes(updatedAttributes);
    props.update("videoCapture", updatedAttributes);
  };

  /**
   * validate the input on blurr and restore if default if its empty or negative
   */
  const validateInputAndRestoreToDefaultIfRequired = (e) => {
    let key = e.target.id;

    let value = e.target.value;
    if (value < 0 || value == "") {
      e.target.value = currentVideoAttributes[key];
      let updatedAttributes = { ...currentVideoAttributes };
      updatedAttributes[key] = defaultAttributes[key];
      setCurrentVideoAttributes(updatedAttributes);
      props.update("videoCapture", updatedAttributes);
    }
  };
  const getMaxDurationInput = () => {
    return (
      <div key={"va_md_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">
          {displayLabels.maxDuration}
        </div>
        <div className="video-attribute-item-value">
          <input
            id={"maxDuration"}
            value={currentVideoAttributes.maxDuration}
            onChange={handleInput}
            onBlur={validateInputAndRestoreToDefaultIfRequired}
          ></input>
        </div>
      </div>
    );
  };

  const getWidthInput = () => {
    return (
      <div key={"va_width_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">{displayLabels.width}</div>
        <div className="video-attribute-item-value">
          <input
            value={currentVideoAttributes.width}
            onChange={handleInput}
            id={"width"}
            onBlur={validateInputAndRestoreToDefaultIfRequired}
          ></input>
        </div>
      </div>
    );
  };

  const getHeightInput = () => {
    return (
      <div key={"va_height_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">{displayLabels.height}</div>
        <div className="video-attribute-item-value">
          <input
            value={currentVideoAttributes.height}
            onChange={handleInput}
            id={"height"}
            onBlur={validateInputAndRestoreToDefaultIfRequired}
          ></input>
        </div>
      </div>
    );
  };

  const cameraTypes = {
    "vyn.FacingModes.Front": "Front",
    "vyn.FacingModes.Back": "Back",
  };

  const handleCameraTypePickerSelection = (e) => {
    let updatedAttributes = { ...currentVideoAttributes };
    updatedAttributes.facingMode = e;
    setCurrentVideoAttributes(updatedAttributes);
    props.update("videoCapture", updatedAttributes);
  };
  const getCameraTypePicker = () => {
    let key = currentVideoAttributes.facingMode;
    let title = cameraTypes[key];
    return (
      <div key={"va_ct_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">
          {displayLabels.facingMode}
        </div>
        <div className="video-attribute-item-value">
          <DropdownButton
            id="dropdown-basic-button"
            title={title}
            onSelect={handleCameraTypePickerSelection}
            key={"va_media_type_dd" + props.index}
          >
            {Object.keys(cameraTypes).map((id, index) => {
              return (
                <Dropdown.Item
                  key={"va_media_type_dd_item" + index}
                  eventKey={id}
                >
                  {cameraTypes[id]}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </div>
    );
  };

  const getCaptureLabelInput = () => {
    return (
      <div key={"va_cli_" + props.index} className="video-attribute-item">
        <div className="video-attribute-item-key">
          {displayLabels.capture_label}
        </div>
        <div className="video-attribute-item-value">
          <input
            value={currentVideoAttributes.capture_label}
            onChange={handleInput}
          ></input>
        </div>
      </div>
    );
  };

  const getAttributeForKey = (key) => {
    switch (key) {
      case "acceptMediaOptions":
        return getMediaTypePicker();
      case "canPause":
        return getCanPausePicker();
      case "maxDuration":
        return getMaxDurationInput();
      case "width":
        return getWidthInput();
      case "height":
        return getHeightInput();
      case "facingMode":
        return getCameraTypePicker();
      case "capture_label":
        return getCaptureLabelInput();
      default:
        return <div key={"empty_" + key + props.index}></div>;
    }
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Video Capture</Accordion.Header>
        <Accordion.Body>
          {Object.keys(currentVideoAttributes).map((key) => {
            return getAttributeForKey(key);
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default VideoAttribute;
