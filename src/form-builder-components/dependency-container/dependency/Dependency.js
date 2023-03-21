import React from 'react'
import './Dependency.css'

const Dependency = (props) => {
    
  return (
    <div className='dependency'>
      <div className='dependency-item'>{props.dependency.id}</div>
      <div className='dependency-item' style={{background: 'yellow',}}><div>{JSON.stringify(props.dependency.value)}</div></div>
    </div>
  )
}

export default Dependency
