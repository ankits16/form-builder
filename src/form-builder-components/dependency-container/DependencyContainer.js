import React, { useEffect, useState } from 'react'
import Dependency from './dependency/Dependency'
import'./DependencyContainer.css'
const DependencyContainer = (props) => {
    const [dependencies, setDependencies] = useState([])

    useEffect(()=>{
        // console.log('<<<<<, DependencyContainer')
        // console.log(props.form_model)
    }, [props.form_model])
    const addDependency = ()=>{

    }

    const DeleteDependency = ()=>{
        
    }
  return (
    <div className='dependency-container'>
      <p>Dependencies</p>
      {dependencies.map((dependency)=>{
        return <Dependency dependency={dependency}/>
      })}
      <button>Add Dependency</button>
    </div>
  )
}

export default DependencyContainer
