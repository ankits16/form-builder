import React from 'react'
import { OptionLevelOperation } from '../OptionsFieldsAttribute'
import './SelectOptions.css'
import { MdOutlineDragIndicator, MdDelete } from "react-icons/md";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const SelectOptions = (props) => {
  

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.option.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleValueChange =(event) =>{
    let updatedOption = {...props.option}
    updatedOption.value = event.target.value
    props.operation(OptionLevelOperation.UpdateOption, updatedOption)
  }

  const handleOptionDelete =()=>{
    props.operation(OptionLevelOperation.DeleteOption, props.option.id)
  }

  return (
    <div className='select-option-container' ref={setNodeRef} style={style}>
      <button className='btn'  {...attributes} {...listeners}><MdOutlineDragIndicator/></button>
      <input value={props.option.value} onChange ={handleValueChange}></input>
      <button className='btn' onClick={handleOptionDelete}><MdDelete/></button>
    </div>
  )
}

export default SelectOptions
