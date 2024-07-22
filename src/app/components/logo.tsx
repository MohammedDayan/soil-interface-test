import React from 'react';
import Image from 'next/image';

const Logo = ({ width = 100, height = 150 }) => {
  return (
    <Image
      src="/txtlogo.svg" // Path to your image inside the public directory
      alt="Logo"
      width={width} // Set width of the image
      height={height} // Set height of the image
    />
  );
};

export default Logo;
