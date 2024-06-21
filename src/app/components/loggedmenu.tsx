
import { useRouter } from 'next/navigation'; 
import React, { useEffect, useRef, useState } from 'react';
import Logo from './logo';

const Header = () => {
  const router = useRouter();
  const username = "Dan"; // Replace "Dan" with your actual username variable
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of menuRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Your logout logic here

    router.push("/");
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-2">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="h-5 ">
            <a href="#" className="text-lg font-bold">
              <Logo  width={20} height={20}/>
            </a>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>              
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="/manual" className="hover:text-gray-300">Manual</a></li>
              
              <li className="relative">
                <div ref={menuRef}>
                  <div className="flex items-center" onClick={handleToggleMenu}>
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white text-gray-600 uppercase font-semibold mr-2">
                      {username.charAt(0)}
                    </span>
                    <span className="text-gray-300 cursor-pointer">{username}</span>
                    <span className="ml-1">&#9662;</span> {/* Downward arrow */}
                  </div>
                  {isOpen && (
                    <div className="absolute bg-white shadow mt-1 py-2 rounded-md w-24">
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
