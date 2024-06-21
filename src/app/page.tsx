

"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import VideoComponent from './components/demo';
import Logo from './components/logo';
import Footer from './components/footer';
import Layout from './components/layout';
import FAQSection from './components/FAQSection';
import { NextUIProvider } from '@nextui-org/react';

const IndexPage = () => {
  const [isContentVisible1, setContentVisible] = useState(false);

  const [isContentVisible, setIsContentVisible] = useState(false);
  useEffect(() => {
    setIsContentVisible(true);
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const soilSection = document.getElementById('soil-section');
      
      if (soilSection) { // Check if soilSection is not null
        const soilSectionTop = soilSection.getBoundingClientRect().top;
  
        if (soilSectionTop < windowHeight * 0.75) {
          setContentVisible(true);
        } else {
          setContentVisible(false);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <div>
       <NextUIProvider> 
      <Head>
        <title>Next.js Landing Page</title>
        <link rel="icon" href="/favicon.ico" />3``
      </Head>

      
     <Layout>

     <div  className="bg-cover bg-center h-100" style={{ backgroundImage: "url('/images/header-image.jpg')" , height:"100vh", }}>
     <div className="flex items-center justify-center h-24 lg:my-0 my-16 md:my-5">
          <div className={`transition-all duration-300 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         
          <h1 style={{color: "red",fontSize:36, fontWeight:"bold",textShadow: "0 0 5px white, 0 0 5px white, 0 0 5px white"}} className="text-3xl  text-center">Cloud-based Soil Structure Analysis Platform for Interface Shear Testing ,Bearing Pipeline etc.</h1>
         
          </div>
          
        </div>
      </div>
      
      <main className="p-8 bg-white">  
      
      
        
        
      <div className='p-10'> 
        <div className={`transition-all duration-600 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 >
       
       Understanding the behavior of soil-structure interfaces is crucial for designing stable structures. Our platform integrates advanced technology to accurately predict these interactions under static and dynamic loads.
       Using cutting-edge two-surface plasticity models, we capture complex behaviors like dilation and strain softening. Our solution provides reliable predictions across various densities and stress levels.
      With our intuitive interface and powerful capabilities, engineers can confidently optimize their designs for superior performance.
       Experience the future of soil-structure interaction analysis with us. Let's redefine possibilities in geo-engineering together.
       </h2> 
        </div>
        </div>
      
        <div className="grid md:grid-cols-3 md:gap-8 gap-4">
        <div className={`transition-all duration-500 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>


      <div className="bg-gray-100  p-4 rounded-lg flex items-center">
        <div >
          <h2 className="text-lg font-semibold mb-2">Interface Shear Testing</h2>
          <p>Some description here...  </p>
          <img src="images/sheartest.jpg" className="w-24 h-24 mr-4 rounded-full" alt="Illustration" />    
          <p className="mb-2"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non impedit esse alias dicta neque sit facere ipsum iste, quibusdam dolores a repellendus accusantium, beatae cum temporibus similique nulla atque ipsa!</p>
          <a href="/ShearTest" className="text-blue-600 mt-2 block border border-blue-600 rounded-md px-4 py-2 inline-flex items-center">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
         </a>
     </div>
    </div>

    </div>
        <div className={`transition-all duration-500 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Bearing Pipeline</h2>
            <p>Some description here...</p>
            <img src="images/bearing.png" className="w-24 h-24 mr-4 rounded-full" alt="Illustration" />    

            <p className=""> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non impedit esse alias dicta neque sit facere ipsum iste, quibusdam dolores a repellendus accusantium, beatae cum temporibus similique nulla atque ipsa!
            </p>
            

            <a href="#" className="text-green-600 mt-2 block border border-green-600 rounded-md px-4 py-2 inline-flex items-center">Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
            </a>
          </div>
          </div>
          <div className={`transition-all duration-500 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-100 p-4 rounded-lg" id="soil-section">
            <h2 className="text-lg font-semibold mb-2">Soil Pile Interaction</h2>
            <p>Some description here...</p>
            <img src="images/pile.jpg" className="w-24 h-24 mr-4 rounded-full" alt="Illustration" />    

            <p className=""> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non impedit esse alias dicta neque sit facere ipsum iste, quibusdam dolores a repellendus accusantium, beatae cum temporibus similique nulla atque ipsa!</p>

            <a href="" className="text-yellow-600 mt-2 block border border-yellow-600 rounded-md px-4 py-2 inline-flex items-center">Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
            </a>
            
           
          </div>
        </div>
        </div>
         
        {/* <VideoComponent></VideoComponent> */}
          <div className='mt-5'>
          <FAQSection />
          </div>
         
       
      </main>

     

        </Layout>
        </NextUIProvider>
    </div>
  );
};

export default IndexPage;
