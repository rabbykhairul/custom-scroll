import React, { useState, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "./customPinchZoom/index";

const HorizontalDiv = (props) => {

  const { onScroll } = props;

  const annotationRef = useRef();

  const [ touchStartX, setTouchStartX ] = useState(0);
  const [ currentZoomScale, setCurrentZoomScale ] = useState(1);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    console.log("\n===");
    console.log("touch start =>");
    console.log("X: ", touch.clientX);
    console.log("Y: ", touch.clientY);
    console.log("===\n");

    setTouchStartX(touch.clientX);
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const touchTraveledXDirection = touchStartX - touch.clientX;
    const touchMoveDirection = touchTraveledXDirection > 0 ? 1 : touchTraveledXDirection < 0 ? -1 : 0;
    const shouldScroll = currentZoomScale === 1 && touchMoveDirection !== 0;
    
    if (shouldScroll)
      onScroll(touchMoveDirection, Math.abs(touchTraveledXDirection));
      
    setTouchStartX(touch.clientX);
  }

  const onZoomChange = ({ scale, x, y }) => {
    const { current: div } = annotationRef;
    setCurrentZoomScale(scale);

    if (div) {
      const value = make3dTransformValue({ x, y, scale});
      div.style.setProperty("transform", value);
    }
  }

  return (
    <div className="horizontal-div" onTouchStart={onTouchStart} onTouchMove={handleTouchMove}>
      <QuickPinchZoom onUpdate={onZoomChange} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-e63946" ref={annotationRef}>1</div>
      </QuickPinchZoom>
      <div className="child-item bg-f1faee">2</div>
      <div className="child-item bg-a8dadc">3</div>
      <div className="child-item bg-457b9d">4</div>
      <div className="child-item bg-1d3557">5</div>
      <div className="child-item bg-d00000">6</div>
      <div className="child-item bg-03071e">7</div>
      <div className="child-item bg-ffba08">8</div>
      <div className="child-item bg-f8f9fa">9</div>
    </div>
  );
}

export default HorizontalDiv;