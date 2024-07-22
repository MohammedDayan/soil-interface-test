import React from 'react';

const Modal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg  flex items-center justify-center">
        <h1 className='font-bold p-10
        '>{title}</h1>
        <img src={imageUrl} alt="Modal content" className="w-full h-full object-cover rounded-lg" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
