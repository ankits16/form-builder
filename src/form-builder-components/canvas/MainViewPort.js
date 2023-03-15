import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import FormPage from "./FormPage/FormPage";

const MainViewPort = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const handlePageSelection = (selectedIndex, e) => {
    console.log("handlePageSelection", selectedIndex);
    setCurrentPageIndex(selectedIndex);
  };

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
