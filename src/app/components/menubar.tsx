

// import React from 'react';
// import Logo from './logo';
// import { useState, useEffect } from 'react';


// const Header = () => {

//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//       const handleScroll = () => {
//           const offset = window.scrollY;
//           setIsScrolled(offset > 0);
//       };

//       window.addEventListener('scroll', handleScroll);

//       return () => {
//           window.removeEventListener('scroll', handleScroll);
//       };
//   }, []);
//   return (
//     <header className={`fixed top-0 w-full bg-white shadow-md z-10 transition-all duration-300 ${isScrolled ? 'bg-gray-100 shadow-sm' : ''}`}>
//       <div className="container mx-auto">
//       <nav className=" mx-auto  py-2 flex justify-between items-center">
   
//           <div>
//             <a href="#" className="text-lg font-bold">
//               <Logo />
//             </a>
//           </div>
//           <div>
//             <ul className="flex space-x-4">
//               <li><a href="/" className="hover:text-gray-300">Home</a></li>
//               <li><a href="/login" className="hover:text-gray-300">Login</a></li>
//               <li><a href="#" className="hover:text-gray-300">Contact</a></li>
//               <li><a href="/manual" className="hover:text-gray-300">Manual</a></li>
//               <li><a href="/test" className="hover:text-gray-300">Terms</a></li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//       <div className={`max-w-7xl mx-auto py-6 px-4 flex justify-center items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
//                 <img src="/txtlogo.svg" alt="Logo" className={`max-h-24 md:max-h-12 ${isScrolled ? 'max-h-12' : 'max-h-24'}`} />
//             </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import Logo from './logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      // Determine scroll direction
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setNavVisible(false);
      } else {
        // Scrolling up
        setNavVisible(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <header
      className={`fixed top-0 w-full bg-[#032571] shadow-md z-10 transition-all duration-300 text-white  ${
        !navVisible && 'transform -translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4" >
        <nav className="mx-auto py-2 flex justify-between items-center">
          <div>
            <a href="#" className="text-lg font-bold">
              <Logo />
            </a>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-gray-300">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/manual" className="hover:text-gray-300">
                  Manual
                </a>
              </li>
              <li>
                <a href="/test" className="hover:text-gray-300">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className={` mx-auto bg-white px-4 flex justify-center items-center transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-1'
        }`}
      >
        <img
          src="/txtlogo.svg"
      
          alt="Logo"
          className={`max-h-10 md:max-h-12 ${isScrolled ? 'max-h-12' : 'max-h-20'}`}
        />
      </div>
    </header>
  );
};

export default Header;
