import React, { useEffect, useState } from 'react';

const AdModal = ({ isOpen, onClose, title, urlImage }) => {
    const [countdown, setCountdown] = useState(5);
  
    useEffect(() => {
      if (isOpen && countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [isOpen, countdown]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[800px] h-[600px]">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`relative text-gray-400 hover:text-gray-900 ${
                countdown > 0 ? 'cursor-not-allowed' : ''
              }`}
              disabled={countdown > 0}
            >
              {countdown > 0 ? (
                <div className="relative flex items-center justify-center">
                  <span className="text-gray-700 font-bold z-10">{countdown}</span>
                  <div className="absolute h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
                </div>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-black text-center">{title}</h2>
          <img
            src={urlImage}
            alt={title}
            className="w-full h-[450px] object-contain rounded-md"
          />
        </div>
      </div>
    );
  };

export default AdModal;