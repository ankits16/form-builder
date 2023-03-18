import React from 'react'
import { OptionLevelOperation } from '../OptionsFieldsAttribute'
import './SelectOptions.css'
import { MdOutlineDragIndicator, MdDelete } from "react-icons/md";


const SelectOptions = (props) => {
  const handleValueChange =(event) =>{
    let updatedOption = {...props.option}
    updatedOption.value = event.target.value
    props.operation(OptionLevelOperation.UpdateOption, updatedOption)
  }

  const handleOptionDelete =()=>{
    props.operation(OptionLevelOperation.DeleteOption, props.option.id)
  }

  return (
    <div className='select-option-container'>
      <button className='btn'><MdOutlineDragIndicator/></button>
      <input value={props.option.value} onChange ={handleValueChange}></input>
      <button className='btn' onClick={handleOptionDelete}><MdDelete/></button>
    </div>
  )
}

export default SelectOptions
