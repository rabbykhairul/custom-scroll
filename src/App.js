import React, { useRef } from "react";
import './App.css';
import HorizontalDiv from "./components/HorizontalDiv";

let startTime;
let elapsedTime;

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

const getAdjustedTargetScrollPositionX = (element, scrollDirection, distanceToTravel) => {
  const currentScrollPositionX = element.scrollLeft;
  const maxScrollX = element.scrollWidth - window.innerWidth;
  const minScrollX = 0;

  let targetScrollPosition = currentScrollPositionX;
  if (scrollDirection === 1) {
    targetScrollPosition = currentScrollPositionX + distanceToTravel > maxScrollX ? maxScrollX : currentScrollPositionX + distanceToTravel;
  } else if (scrollDirection === -1) {
    targetScrollPosition = currentScrollPositionX - distanceToTravel < minScrollX ? minScrollX : currentScrollPositionX - distanceToTravel;
  }

  return targetScrollPosition;
}

const animateScrollLeft = ({ element, startScrollLeft, delta, duration }) => {
  startTime = Date.now();

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  const animationStep = (timeStamp) => {
    elapsedTime = Date.now() - startTime;
    let progressPercentage = (100 / duration) * elapsedTime;
    let factor = easeOutQuad(progressPercentage / 100);

    element.scrollLeft = startScrollLeft + (delta * factor);

    if (elapsedTime < duration)
      requestAnimationFrame(animationStep);
  }

  requestAnimationFrame(animationStep);
}

const performAutomaticScrollWithAnimationInXDirection = ({
  element,
  distanceTraveledXBetweenTouchStartAndEnd,
  scrollDirection,
  elapsedTimeBetweenTouchStartAndEnd
}) => {
  const currentScrollPositionX = element.scrollLeft;
  const targetScrollPositionX = getAdjustedTargetScrollPositionX(element, scrollDirection, 1750);
  const delta = targetScrollPositionX - currentScrollPositionX;

  animateScrollLeft({
    element,
    startScrollLeft: currentScrollPositionX,
    delta,
    duration: 2500
  });
}

function App() {
  const containerRef = useRef();

  const onScroll = (scrollDirection, targetScrollAmount) => {
    const currentScrollPositionX = containerRef.current.scrollLeft;
    containerRef.current.setProperty = ("scroll-behavior", "smooth");
    containerRef.current.scrollLeft = 
      scrollDirection === 1 ? currentScrollPositionX + targetScrollAmount : currentScrollPositionX - targetScrollAmount;
  }

  const autoScroll = (distanceTraveledX, scrollDirection, elapsedTime) => {
    const container = containerRef.current;

    performAutomaticScrollWithAnimationInXDirection({
      element: container,
      distanceTraveledXBetweenTouchStartAndEnd: distanceTraveledX,
      scrollDirection,
      elapsedTimeBetweenTouchStartAndEnd: elapsedTime,
    })

    // const currentScrollPositionX = container.scrollLeft;
    // const targetScrollPositionX = getAdjustedTargetScrollPositionX(container, scrollDirection, 1750);
    // const delta = targetScrollPositionX - currentScrollPositionX;

    // console.log("\n===");
    // console.log("currentScrollPositionX: ", currentScrollPositionX);
    // console.log("targetScrollPositionX: ", targetScrollPositionX);
    // console.log("delta: ", delta);
    // console.log("===\n");
    
    // animateScrollLeft({
    //   element: container,
    //   startScrollLeft: currentScrollPositionX,
    //   delta,
    //   duration: 2500
    // });
  }

  return (
    <div ref={containerRef} style={{ width: "100vw", overflow: "scroll" }} className="main-div">
      <HorizontalDiv onScroll={onScroll} onTouchRelease={autoScroll} />
    </div>
  );
}

export default App;
