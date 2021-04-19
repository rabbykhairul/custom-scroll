import React from "react";

const HorizontalDiv = (props) => {
  return (
    <div className="horizontal-div" onTouchMove={() => console.log("===\ntouch move\n===\n")}>
      <div className="child-item bg-e63946">1</div>
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