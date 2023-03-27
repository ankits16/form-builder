import React, { useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import ExpandingText from "../exapnding-text/ExpandingText";
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
    //console("handlePageSelection", selectedIndex);
    setCurrentPageIndex(selectedIndex);
  };

  const updateIdsMap = () => {
    let updatedMap = {};
    //console(props);
    props.data.formData.pages.map((page) => {
      page.sections.map((section) => {
        section.fields.map((field) => {
          let existingMap = updatedMap[field.id];
          let pageKey = page.id;
          let sectionKey = section.id;
          let completeKey =
            page.id + "::" + section.id + "::" + field.editor_id;
          if (existingMap) {
            existingMap.push(completeKey);
            updatedMap[field.id] = existingMap;
          } else {
            updatedMap[field.id] = [completeKey];
          }
        });
      });
    });
    return updatedMap;
  };

  useEffect(() => {
    updateIdsMap();
  }, []);

  const updatePagesInDataSource = (pages) => {
    let updatedFormData = { ...props.formData };
    updatedFormData.pages = pages;
    props.data.formOperation(updatedFormData);
    updateIdsMap();
  };

  const deletePage = (pageId) => {
    //console('delete pageId ' + pageId)
    // let pageId = props.page.id;
    let filterdPages = props.data.formData.pages.filter((e) => {
      return e.id !== pageId;
    });
    filterdPages.map((page, index) => {
      page.id = index + 1;
    });

    //console('delete pageId ' + pageId)
    //console('num pages ' + filterdPages.length)
    if (pageId > filterdPages.length) {
      setCurrentPageIndex(0);
    } else {
      setCurrentPageIndex(pageId - 1);
    }
    updatePagesInDataSource(filterdPages);
    // setCurrentPageIndex(0)
    //console('<<<<< move to ' + currentPageIndex)
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
    //console("updatePage " + oldPageIndex);
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

  const addPage = () => {
    //console(props.data.formData)
    let allPages = [...props.data.formData.pages];
    allPages.push({ id: allPages.length + 1, sections: [] });
    updatePagesInDataSource(allPages);
    setCurrentPageIndex(allPages.length - 1);
  };

  const handleStoryboardTitleChange = (e) => {
    let updatedFormData = { ...props.data.formData };
    updatedFormData.title = e.target.value;
    props.data.formOperation(updatedFormData);
  };

  return (
    <>
      {props.data.formData.pages.length === 0 ? (
        <button className="btn btn-primary" onClick={addPage}>
          Add Page to start
        </button>
      ) : (
        <div>
          <div className="storyboard">
          <div className="storyboard-header">
            <div className="storyboard-header-item">Storyboard Title</div>
            <div className="storyboard-header-item" style={{flex: 1}}>
              <ExpandingText
                value={props.data.formData.title}
                onChange={handleStoryboardTitleChange}
                placeholder={"Storyboard title goes here"}
                style={{width: '100%'}}
              ></ExpandingText>
              {/* <input type="text" value={props.data.formData.title} onChange={handleStoryboardTitleChange}></input> */}
            </div>
            <div className="storyboard-header-item">
              <button className="btn btn-primary" onClick={addPage}>
                Add Page
              </button>
            </div>
          </div>
          </div >
          <div className="storyboard">
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
                        form_ids_map={updateIdsMap()}
                      ></FormPage>
                    }
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default Storyboard;
