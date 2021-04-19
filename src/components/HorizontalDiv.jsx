import React, { useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "./customPinchZoom/index";

const HorizontalDiv = (props) => {

  const annotationRef = useRef();

  const handleTouchMove = (e) => {
    
  }

  const onZoomChange = ({ scale, x, y }) => {
    const { current: div } = annotationRef;

    if (div) {
      const value = make3dTransformValue({ x, y, scale});
      div.style.setProperty("transform", value);
    }
  }

  return (
    <div className="horizontal-div" onTouchMove={handleTouchMove}>
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