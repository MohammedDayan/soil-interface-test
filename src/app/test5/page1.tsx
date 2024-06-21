"use client"
import React, { useState, useEffect } from "react";
import {Progress} from "@nextui-org/progress";
import ProgressBar from "@ramonak/react-progress-bar";

export default function App() {
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 20 ));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <><ProgressBar completed={100} 
    transitionDuration="2s"
    animateOnRender={true}
    
    
    /></>
  );
}

