import React from 'react'
import MainViewPort from './MainViewPort'
import Palette from './Palette'
import styles from './canvas.css'
import Button from 'react-bootstrap/Button';
const Canvas = (props) => {
  console.log("canvas forms data", props.formData)
  const exportJson = ()=>{
    console.log('exportJson');
    let fileName = 'json.txt'
    let contentType = 'text/plain'
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(props.formData, null, 2)], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  return (
    <>
      <div className="canvas">
        <div>
        <Button variant="primary" onClick={exportJson}>Export</Button>
        </div>
        <div className="box">
          <MainViewPort pages = {props.pages} formData={props.formData} formOperation={props.formOperation}></MainViewPort>
        </div>
        <div className="sidebar">
          <Palette formData={props.formData} formOperation={props.formOperation}></Palette>
        </div>
        <div id="clear" style={{clear:"both"}}></div>
      </div>
    </>
  )
}

export default Canvas
