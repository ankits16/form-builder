import React, { useEffect, useState } from "react";

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

  const [idsMap, setIdsMap] = useState({});

  const updateIdsMap = () => {
    let updatedMap = {};
    console.log(props);
    props.data.formData.pages.map((page) => {
      page.sections.map((section) => {
        section.fields.map((field) => {
          let existingMap = updatedMap[field.id];
          let pageKey = page.id;
          let sectionKey = section.id;
          let completeKey = page.id + '::' + section.id + '::' + field.editor_id
          if (existingMap) {
            // let pageMap = existingMap[pageKey];
            // if (pageMap) {
            //   let sectionMap = pageMap[sectionKey];
            //   if (sectionMap) {
            //     sectionMap.push(field.editor_id);
            //     updatedMap[field.id][pageKey][sectionKey] = sectionMap;
            //   } else {
            //     updatedMap[field.id][pageKey][sectionKey] = [field.editor_id];
            //   }
            // } else {
            //   let sectionDict = {};
            //   sectionDict[sectionKey] = [field.editor_id];
            //   updatedMap[field.id][pageKey] = sectionDict;
            // }
            existingMap.push(completeKey)
            updatedMap[field.id] = existingMap
          } else {
            // let sectionDict = {};
            // sectionDict[sectionKey] = [field.editor_id];
            // let dict = {};
            // dict[pageKey] = sectionDict;
            // updatedMap[field.id] = dict;

            updatedMap[field.id] = [completeKey]
          }
        });
      });
    });
    
    // setIdsMap(updatedMap)
    console.log("$$$$$$$$$$ updateIdsMap");
    console.log(updatedMap);
    console.log("------- updateIdsMap");
    return updatedMap
  };

  useEffect(()=>{
    updateIdsMap()
  }, [])


  const updatePagesInDataSource = (pages) => {
    let updatedFormData = { ...props.formData };
    updatedFormData.pages = pages;
    props.data.formOperation(updatedFormData);
    updateIdsMap();
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
            <div className="storyboard-header-item">
              <input type="text"></input>
            </div>
            <div className="storyboard-header-item">
              <button className="btn">Add Page</button>
            </div>
          </div>
          <Carousel
            interval={null}
            activeIndex={currentPageIndex}
            onSelect={handlePageSelection}
            controls={false}
          >
            {props.data.formData.pages.map((page, index) => {
              return (
                <Carousel.Item key={index} style={{ paddingBottom: 50 }}>
                  {
                    <FormPage
                      data={props.data.formData}
                      page={page}
                      index={index}
                      key={index}
                      operation={operation}
                      idsMap={updateIdsMap()}
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
