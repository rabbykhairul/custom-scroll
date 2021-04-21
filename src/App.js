import React, { useRef } from "react";
import './App.css';
import HorizontalDiv from "./components/HorizontalDiv";

let startTime;
let elapsedTime;
let lastRequestedAnimationFrameId;

// function easeOutQuad(x) {
//   return 1 - (1 - x) * (1 - x);
// }

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
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

  // cancel animation frames that were requested before this call to animation
  const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  if (lastRequestedAnimationFrameId)
    cancelAnimationFrame(lastRequestedAnimationFrameId);

  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  const animationStep = (timeStamp) => {
    elapsedTime = Date.now() - startTime;
    let progressPercentage = (100 / duration) * elapsedTime;
    let factor = easeOutExpo(progressPercentage / 100);

    element.scrollLeft = startScrollLeft + (delta * factor);

    if (elapsedTime < duration)
      lastRequestedAnimationFrameId = requestAnimationFrame(animationStep);
  }

  if (duration > 0)
    lastRequestedAnimationFrameId = requestAnimationFrame(animationStep);
}

const getTargetScrollAmount = (
  distanceTraveledXBetweenTouchStartAndEnd, 
  elapsedTimeBetweenTouchStartAndEnd
) => {
  const pxFactor = 950;
  const pxTraveledPerMsec = 
    Math.abs(distanceTraveledXBetweenTouchStartAndEnd) / elapsedTimeBetweenTouchStartAndEnd;

  console.log("\n===");
  console.log("pxPerMsec: ", pxTraveledPerMsec);
  console.log("===\n");

  return pxTraveledPerMsec < 0.25 ? 0 : pxTraveledPerMsec * pxFactor;
}

const performAutomaticScrollWithAnimationInXDirection = ({
  element,
  distanceTraveledXBetweenTouchStartAndEnd,
  scrollDirection,
  elapsedTimeBetweenTouchStartAndEnd
}) => {
  const pxToTravelPerMsec = 1.4;
  const currentScrollPositionX = element.scrollLeft;
  const targetScrollAmount = getTargetScrollAmount(
    distanceTraveledXBetweenTouchStartAndEnd,
    elapsedTimeBetweenTouchStartAndEnd
  );
  const targetScrollPositionX = getAdjustedTargetScrollPositionX(element, scrollDirection, targetScrollAmount);
  const delta = Math.abs(targetScrollPositionX - currentScrollPositionX) < 0.5 ? 0 : targetScrollPositionX - currentScrollPositionX;
  const scrollDurantion = Math.abs(delta) < 35 ? Math.abs(delta) * pxToTravelPerMsec : Math.abs(delta) / pxToTravelPerMsec;

  console.log("\n===");
  console.log("currentScrollPosition: ", currentScrollPositionX);
  console.log("targetScrollAmount: ", targetScrollAmount);
  console.log("targetScrollPosition: ", targetScrollPositionX);
  console.log("delta: ", delta);
  console.log("scroll duration: ", scrollDurantion);
  console.log("===\n");

  animateScrollLeft({
    element,
    startScrollLeft: currentScrollPositionX,
    delta,
    duration: scrollDurantion
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
