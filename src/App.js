import logo from "./logo.svg";
import "./App.css";
import FormBuilderHeader from "./form-builder-components/FormBuilderHeader";
import Canvas from "./form-builder-components/canvas/Canvas";
import { useEffect, useState } from "react";
import data from "./sample_input_json.json";
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
function App() {
  const [formData, setFormData] = useState(data);

  const updateFormDataFromUI = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  return (
    <>
      <FormBuilderHeader />
      {/* <DragUI></DragUI> */}
      <Canvas formData={formData} formOperation={updateFormDataFromUI} />
      
    </>
  );
}

export default App;
