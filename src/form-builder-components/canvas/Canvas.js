import React from "react";
import Storyboard from "../storyboard/Storyboard.js";
import "./canvas.css";

const Canvas = (props) => {
  const exportJson = () => {
    console.log("exportJson");
    let fileName = "json.txt";
    let contentType = "text/plain";
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(props.formData, null, 2)], {
      type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };
  return (
    <>
      <div className="canvas" >
        <div className="box">
          <Storyboard data={props}></Storyboard>
        </div>
        <div id="clear" style={{ clear: "both" }}></div>
      </div>
    </>
  );
};

export default Canvas;
