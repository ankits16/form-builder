import logo from "./logo.svg";
import "./App.css";
import FormBuilderHeader from "./form-builder-components/FormBuilderHeader";
import Canvas from "./form-builder-components/canvas/Canvas";
import { useEffect, useState } from "react";
import data from "./rrr.json";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DragUI from "./DragUI";
import ExportStoryboard from "./form-builder-components/export-storyboard/ExportStoryboard";
function App() {
  const [formData, setFormData] = useState(data);

  const updateFormDataFromUI = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const [showExportStoryboardModal, setShowExportStoryboardModal] = useState(false)

  const showStoryboardExport = ()=>{
    //console('<<<<<< app.js showStoryboardExport')
    setShowExportStoryboardModal(true)
  }

  const exportJson = (fileName) => {
    // let fileName = "json.txt"
    //console("exportJson " + fileName);
    
    let contentType = "text/plain";
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(formData, null, 2)], {
      type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const hideStoryboardExport = (fileName)=>{
    //console('<<<<<< app.js hideStoryboardExport')
    setShowExportStoryboardModal(false)
    if (fileName){
      exportJson(fileName)
    }
  }

  //console('render with ' + showExportStoryboardModal)
  return (
    <>
      <FormBuilderHeader showStoryboardExport ={showStoryboardExport}/>
      {/* <DragUI></DragUI> */}
      <Canvas formData={formData} formOperation={updateFormDataFromUI} />
      {showExportStoryboardModal ? <ExportStoryboard showModal={true} hideModel={hideStoryboardExport}/> : ''}
    </>
  );
}

export default App;
