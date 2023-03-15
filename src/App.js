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

  const updateFormData = (updatedFormData) => {
    setFormData(updateFormData);
  };

  console.log("app js data is ", formData);

  const updateFormDataFromUI = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const [items, setItems] = useState([1, 2, 3]);
  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  return (
    <>
      <FormBuilderHeader />
      {/* <DragUI></DragUI> */}
      <Canvas formData={formData} formOperation={updateFormDataFromUI} />
      
    </>
  );
}

export default App;
