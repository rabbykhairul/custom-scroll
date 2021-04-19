import React, { useRef } from "react";
import './App.css';
import HorizontalDiv from "./components/HorizontalDiv";

function App() {
  const containerRef = useRef();

  const onScroll = (scrollDirection, targetScrollAmount) => {
    const currentScrollPositionX = containerRef.current.scrollLeft;
    containerRef.current.setProperty = ("scroll-behavior", "smooth");
    containerRef.current.scrollLeft = 
      scrollDirection === 1 ? currentScrollPositionX + targetScrollAmount : currentScrollPositionX - targetScrollAmount;

    console.log("\n===");
    console.log("containerRef: ", containerRef.current);
    console.log("===\n");
  }

  return (
    <div ref={containerRef} style={{ width: "100vw", overflow: "scroll" }} className="main-div">
      <HorizontalDiv onScroll={onScroll} />
    </div>
  );
}

export default App;
