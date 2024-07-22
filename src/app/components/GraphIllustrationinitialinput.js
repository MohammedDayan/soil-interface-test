import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Modal from '../components/Modal';

const AnimatedPicture = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(null);

  const openModal = (tabIndex) => setActiveTab(tabIndex);
  const closeModal = () => setActiveTab(null);

  const tabs = [
    { id: 1, title: 'Monotonic ', imageUrl: '/loading1.png' },
    { id: 2, title: 'Cyclic-2-way loading', imageUrl: '/loading2.png' },
    { id: 3, title: 'Cyclic-1-way loading', imageUrl: 'loading3.png' },
    { id: 3, title: 'Cyclic-1.5-way loading', imageUrl: 'loading4.png' },
    { id: 3, title: 'Cyclic-other loading', imageUrl: 'loading5.png' },
  ];



  // Use useEffect to trigger animation when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center  transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>


      <div className="transition-opacity duration-1000 opacity-100">
        <Image
          src="/graph3.png" // Path to your image inside the public directory
          alt="Graph Illustration"
          width={800} // Set width of the image
          height={600} // Set height of the image
        />
      </div>

      <div 
     
      >

        <div className="">
          
          <div className=" min-h-screen py-2 mr-2">
            <div className='font-bold'>LOADING TYPES</div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => openModal(tab.id)}
                className="px-4 py-2 mr-2 bg-[#032571] text-white rounded-md hover:bg-gray-400 hover:text-[#032571] hover:font-bold"
              >
                {tab.title}
              </button>
            ))}
          </div>
          {tabs.map((tab) => (
            <Modal
              key={tab.id}
              isOpen={activeTab === tab.id}
              onClose={closeModal}
              imageUrl={tab.imageUrl}
              title={tab.title}
            />
          ))}
        </div>


      </div>

    </div>
  );
};

export default AnimatedPicture;
