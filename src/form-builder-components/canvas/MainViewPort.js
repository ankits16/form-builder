import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import FormPage from "./FormPage/FormPage";

const MainViewPort = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handlePageSelection = (selectedIndex, e) => {
    console.log("handlePageSelection", selectedIndex);
    setCurrentPageIndex(selectedIndex);
  };
  console.log("MainViewPort forms data", props.formData.pages);
  console.log("MainViewPort forms data length ", props.formData.pages.length);
  return (
    <>
      {props.formData.pages.length === 0 ? (
        "Add a page to start"
      ) : (
        <Carousel
          interval={null}
          activeIndex={currentPageIndex}
          onSelect={handlePageSelection}
        >
          {props.formData.pages.map((page, index) => {
            return (
              <Carousel.Item key={index}>
                {
                  <FormPage
                    formData={props.formData}
                    page={page}
                    index={index}
                    key={index}
                    formOperation={props.formOperation}
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
