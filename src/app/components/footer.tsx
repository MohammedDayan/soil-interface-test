import React from 'react';
import Logo from './logo';

const Footer = () => {
  return (
<footer className="bg-gray-800 text-white p-4 mt-8">
<nav className="flex justify-between items-center">
  <div>
    <a href="#" className="text-lg font-bold">
    <Logo></Logo>
   
    </a>
  </div>
  <div>
    <ul className="flex space-x-4">
      <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
      <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
      <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
    </ul>
  </div>
</nav>
</footer>
  )
}
export default Footer;