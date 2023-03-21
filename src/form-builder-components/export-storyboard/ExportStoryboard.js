import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ExportStoryboard.css";

const ExportStoryboard = (props) => {
  const [show, setShow] = useState(false);
  const [isExportDisabled, setIsExportDisabled] = useState(true);
  const [fileName, setFileName] = useState("test");
  useEffect(() => {
    console.log(props);
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    props.hideModel(fileName);
  };

  var isValid = (function () {
    var rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2 = /^\./; // cannot start with dot (.)
    var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    return function isValid(fname) {
      return rg1.test(fname) && !rg2.test(fname) && !rg3.test(fname);
    };
  })();

  const handleFileNameInput = (e) => {
    setIsExportDisabled(!isValid(e.target.value));
    if (isExportDisabled) {
      setFileName("");
    } else {
      setFileName(e.target.value);
    }
  };

  function dropHandler(ev) {
    ev.preventDefault(); 
    // alert("File(s) dropped");
    // console.log(ev)
    if (ev.dataTransfer.items) {
        if (ev.dataTransfer.items.length > 1) {
            alert("Only single files can be dragged and dropped");
            return;
        }
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();
            console.log(file.name)
            setFileName(ev.dataTransfer.items[0].name)     
            console.log(fileName)                       
        }
    }
  }

  const onDragEnter = (event) => {
    event.preventDefault(); 
    console.log('<<<<<<<<< onDragEnter')
  }

  const onDragEnd = (event) => {
    event.preventDefault(); 
    console.log('<<<<<<<<< onDragEnd')
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export Storyboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please enter output file name :
          <div onDragEnter={onDragEnter} onDrop={dropHandler} onDragOver={onDragEnd} style={{backgroundColor:'yellow', height:100}}>
            <input
              onChange={handleFileNameInput} value={fileName}
            ></input>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            disabled={isExportDisabled}
          >
            Export
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExportStoryboard;
