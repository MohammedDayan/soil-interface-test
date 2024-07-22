import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AnimatedPicture.module.css'; // Import CSS file for styles

const AnimatedPicture = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to trigger animation when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex justify-center items-center h-100 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className=" flex flex-col items-center justify-center transition-opacity duration-1000 opacity-100">
        <Image

          src="/graph2.png" // Path to your image inside the public directory
          alt="Graph Illustration"
          width={500} // Set width of the image
          height={500} // Set height of the image
        />

<div
      
      //  style={{float:"right"}}
      >
        <Image

          src="/modelparams.png" // Path to your image inside the public directory
          alt="Graph Illustration"
          width={800} // Set width of the image
          height={800} // Set height of the image
        />
      </div>
      </div  >
      
      
      

    </div>

  );
};

export default AnimatedPicture;
