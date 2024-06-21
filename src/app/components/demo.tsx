import React from 'react';

const VideoComponent = () => {
  return (
    
    <div >
        <div className='text-center my-5 text-xl font-bold'> Video Demo of Interface Shear Testing</div>
      <div className='flex justify-center items-center '>
                
        <video controls width="80%" height="80%">
            
        <source src="/videos/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      </div>
      
    </div>
  );
};

export default VideoComponent;
