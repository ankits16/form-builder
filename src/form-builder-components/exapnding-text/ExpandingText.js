import React, { useCallback, useEffect, useRef } from "react";
import Textarea from "react-expanding-textarea";

const ExpandingText = (props) => {
  const textareaRef = useRef(null);

  const handleChange = useCallback((e) => {
    console.log("Changed value to: ", e.target.value);
    props.onChange(e)
  }, []);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);
  return (
    <Textarea
      defaultValue={props.value}
      key={props.key}
      id={props.defaultValue}
      onChange={handleChange}
      placeholder={props.placeholder}
      ref={textareaRef}
      style={{width: '100%'}}
    ></Textarea>
  );
};

export default ExpandingText;
