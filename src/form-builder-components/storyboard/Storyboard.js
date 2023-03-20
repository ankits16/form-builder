import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import FormPage from "../form-page/FormPage";
import "./Storyboard.css";

/**
 * Operations at Storyboard level
 * - Delete Page
 * - Update page at Index
 */

export const StoryboardLevelOperations = Object.freeze({
  AddPage: Symbol("add_page"),
  DeletePage: Symbol("delete_page"),
  UpdatePage: Symbol("update_page"),
});

const Storyboard = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handlePageSelection = (selectedIndex, e) => {
    console.log("handlePageSelection", selectedIndex);
    setCurrentPageIndex(selectedIndex);
  };

  const updatePagesInDataSource = (pages) => {
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
    updatePagesInDataSource(filterdPages);
  };

  const updatePage = (updatedPage) => {
    let updatedJson = { ...props.data.formData };
    let oldPageIndex = -1;
    updatedJson.pages.map((page, index) => {
      if (page.id === updatedPage.id) {
        oldPageIndex = index;
      }
    });
    updatedJson.pages.splice(oldPageIndex, 1, updatedPage);
    console.log("updatePage " + oldPageIndex);
    updatePagesInDataSource(updatedJson.pages);
  };

  const operation = (opertaionType, params) => {
    switch (opertaionType) {
      case StoryboardLevelOperations.DeletePage:
        deletePage(params);
        break;
      case StoryboardLevelOperations.UpdatePage:
        updatePage(params);
        break;
      default:
        console.error("unidentified Storyboard Level Operations");
    }
  };

  return (
    <>
      {props.data.formData.pages.length === 0 ? (
        "Add a page to start"
      ) : (
        <div>
          <div className="storyboard-header">
            <div className="storyboard-header-item">Storyboard Title</div>
            <div className="storyboard-header-item"><input type='text'></input></div>
            <div className="storyboard-header-item"><button className="btn">Add Page</button></div>
          </div>
          <Carousel
            interval={null}
            activeIndex={currentPageIndex}
            onSelect={handlePageSelection}
            controls={false}
          >
            {props.data.formData.pages.map((page, index) => {
              return (
                <Carousel.Item key={index} style={{paddingBottom:50}}>
                  {
                    <FormPage
                      data={props.data}
                      page={page}
                      index={index}
                      key={index}
                      operation={operation}
                    ></FormPage>
                  }
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Storyboard;
