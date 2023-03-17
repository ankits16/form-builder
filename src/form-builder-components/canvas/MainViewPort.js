import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import FormPage from "./FormPage/FormPage";

/**
 * Operations at main view port level
 * - Delete Page
 * - Update page at Index
 */

export const MainViewPortLevelOperations  = Object.freeze({
  DeletePage : Symbol('delete_page'),
  UpdatePage : Symbol('update_page')
});

const MainViewPort = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handlePageSelection = (selectedIndex, e) => {
    console.log("handlePageSelection", selectedIndex);
    setCurrentPageIndex(selectedIndex);
  };

  const updatePagesInDataSource = (pages)=>{
    let updatedFormData = { ...props.formData };
    updatedFormData.pages = pages;
    props.data.formOperation(updatedFormData);
  };

  const deletePage = (pageId) => {
    // let pageId = props.page.id;
    let filterdPages = props.data.formData.pages.filter((e) => {
      return e.id !== pageId;
    });
    filterdPages.map((page, index) => {
      page.id = index + 1;
    });
    updatePagesInDataSource(filterdPages)
  }

  const updatePage = (updatedPage) => {
    let updatedJson = { ...props.data.formData };
    let oldPageIndex = -1
    updatedJson.pages.map((page, index) => {
      if (page.id ===  updatedPage.id) {
        oldPageIndex = index
      }
    });
    updatedJson.pages.splice(oldPageIndex, 1, updatedPage)
    console.log("updatePage " + oldPageIndex)
    updatePagesInDataSource(updatedJson.pages)
  }

  const operation = (opertaionType, params) =>{
    switch (opertaionType){
      case MainViewPortLevelOperations.DeletePage:
        deletePage(params);
        break;
      case MainViewPortLevelOperations.UpdatePage:
        updatePage(params)
        break;
      default:
        console.error('unidentified MainViewPortLevelOperations')
    }
  }


  return (
    <>
      {props.data.formData.pages.length === 0 ? (
        "Add a page to start"
      ) : (
        <Carousel
          interval={null}
          activeIndex={currentPageIndex}
          onSelect={handlePageSelection}
        >
          {props.data.formData.pages.map((page, index) => {
            return (
              <Carousel.Item key={index}>
                {
                  <FormPage
                    data = {props.data}
                    page={page}
                    index={index}
                    key={index}
                    operation = {operation}
                  ></FormPage>
                }
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default MainViewPort;
