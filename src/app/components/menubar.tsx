import React from 'react';
import Logo from './logo';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div>
            <a href="#" className="text-lg font-bold">
              <Logo />
            </a>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/login" className="hover:text-gray-300">Login</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="/manual" className="hover:text-gray-300">Manual</a></li>
              <li><a href="/test" className="hover:text-gray-300">Terms</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
