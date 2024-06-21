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
    <div className={`flex justify-center items-center h-screen transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="transition-opacity duration-1000 opacity-100">
        <Image
          src="/graph1.png" // Path to your image inside the public directory
          alt="Graph Illustration"
          width={500} // Set width of the image
          height={300} // Set height of the image
        />
      </div>
    </div>
  );
};

export default AnimatedPicture;
