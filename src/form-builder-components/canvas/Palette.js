import React from 'react'

const Palette = (props) => {
  const addPageOperation = ()=>{
    console.log(props.formData)
    // props.formOperation('addPage')
    let pageId = 0
    if (props.formData.pages.length > 0) {
      pageId = props.formData.pages.length + 1
    }
    const newPage = {
      id: pageId,
      sections: []
    }
    let allPages = [...props.formData.pages, newPage]
    let updatedJson = {...props.formData}
    updatedJson.pages = allPages
    props.formOperation(updatedJson)
  }
  return (
    <>
      <div id="mySidebar">
        <h3>Palette</h3>
      </div>
      <ul className="list-group">
        <li className="list-group-item" onClick={addPageOperation}>Add Page</li>
        <li className="list-group-item">Add Section</li>
        <li className="list-group-item">Add Form Item</li>
        
      </ul>


    </>
  )
}

export default Palette
