import React, { useState, createRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "./customPinchZoom/index";

const HorizontalDiv = (props) => {

  const { onScroll, onTouchRelease, onTap } = props;

  const [annotationRefs, setAnnotationsRefs] = useState([]);
  if (annotationRefs.length === 0) {
    let refs = [];
    for (let i = 0; i < 9; i++) {
      refs.push(createRef());
    }
    setAnnotationsRefs(refs);
  }

  const [ touchStartX, setTouchStartX ] = useState(0);
  const [ touchStartTimeInMsec, setTouchStartTimeInMsec ] = useState(Date.now());
  const [ prevTouchX, setPrevTouchX ] = useState(0);
  const [ currentZoomScale, setCurrentZoomScale ] = useState(1);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    console.log("\n===");
    console.log("touch start =>");
    console.log("X: ", touch.clientX);
    console.log("Y: ", touch.clientY);
    console.log("===\n");

    setTouchStartX(touch.clientX);
    setPrevTouchX(touch.clientX);
    setTouchStartTimeInMsec(Date.now());

    onTap();
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const touchTraveledXDirection = prevTouchX - touch.clientX;
    const touchMoveDirection = touchTraveledXDirection > 0 ? 1 : touchTraveledXDirection < 0 ? -1 : 0;
    const shouldScroll = currentZoomScale === 1 && touchMoveDirection !== 0;
    
    if (shouldScroll)
      onScroll(touchMoveDirection, Math.abs(touchTraveledXDirection));
      
    setPrevTouchX(touch.clientX);
  }

  const handleTouchEnd = (e) => {
    const elapsedTimeBetweenTouchStartAndEnd = Date.now() - touchStartTimeInMsec;
    const touch = e.changedTouches[0];
    const touchTraveledDistanceX = touchStartX - touch.clientX;
    const touchMoveDirection = touchTraveledDistanceX > 0 ? 1 : touchTraveledDistanceX < 0 ? -1 : 0;
    const shouldScroll = currentZoomScale === 1 && touchMoveDirection !== 0;

    console.log("\n===");
    console.log("distanceX: ", touchTraveledDistanceX);
    console.log("elapsedTime: ", elapsedTimeBetweenTouchStartAndEnd);
    console.log("===\n");

    if (shouldScroll)
      onTouchRelease(touchTraveledDistanceX, touchMoveDirection, elapsedTimeBetweenTouchStartAndEnd);
  }

  const onZoomChange = ({ scale, x, y }, refIdx) => {
    const { current: div } = annotationRefs[refIdx];
    setCurrentZoomScale(scale);

    if (div) {
      const value = make3dTransformValue({ x, y, scale});
      div.style.setProperty("transform", value);
    }
  }

  return (
    <div className="horizontal-div" onTouchStart={onTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} >
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 0)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-e63946" ref={annotationRefs[0]}>1</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 1)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-f1faee" ref={annotationRefs[1]}>2</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 2)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-a8dadc" ref={annotationRefs[2]}>3</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 3)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-457b9d" ref={annotationRefs[3]}>4</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 4)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-1d3557" ref={annotationRefs[4]}>5</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 5)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-d00000" ref={annotationRefs[5]}>6</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 6)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-03071e" ref={annotationRefs[6]}>7</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 7)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-ffba08" ref={annotationRefs[7]}>8</div>
      </QuickPinchZoom>
      <QuickPinchZoom onUpdate={(update) => onZoomChange(update, 8)} tapZoomFactor={0} draggableUnZoomed={false}>
        <div className="child-item bg-f8f9fa" ref={annotationRefs[8]}>9</div>
      </QuickPinchZoom>
    </div>
  );
}

export default HorizontalDiv;