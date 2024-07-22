import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
    {
        id: 1,
        image: '/slider/1.jpg',
        text: 'Interface Shear Test ',
    },
    {
        id: 2,
        image: '/slider/2.jpg',
        text: 'Buried Pipeline ',
    },
    {
        id: 3,
        image: '/slider/3.jpg',
        text: 'Pile Foundation',
    },
];

const Slider = () => {
    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            transitionTime={500}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            dynamicHeight={true}
            className="h-[600px]"
        >
            {slides.map((slide) => (
                <div key={slide.id} className="relative h-[600px]">
                    <img src={slide.image} alt={`Slide ${slide.id}`} className="h-[600px]" />
                    
                    <div className="absolute inset-0 flex items-center text-white text-4xl font-bold bg-gradient-to-r from-black to-transparent">
                        <div className='w-2/3 flex flex-col '>

                                
                        <div className="p-4">
                            {slide.text}


                        </div>
                        <div>
                        <a href="/test5" className="block p-1 mt-10  items-center w-[300px] bg-black rounded-lg border border-gray-200 shadow-md group hover:shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:bg-[#032571] hover:scale-105">
                        Get started
                        </a>
                        </div>

                       

                        {/* <div className="text-white mt-2 block border border-white bg rounded-md px-4 py-2 inline-flex  transition duration-300 ease-in-out transform group-hover:bg-white group-hover:text-blue-600">

                            {slide.text}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div> */}
                        </div>

                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
