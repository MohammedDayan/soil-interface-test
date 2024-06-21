import React from 'react';
import Image from 'next/image';

const Logo = ({ width = 40, height = 40 }) => {
  return (
    <Image
      src="/logo.png" // Path to your image inside the public directory
      alt="Logo"
      width={width} // Set width of the image
      height={height} // Set height of the image
    />
  );
};

export default Logo;
