import React from 'react';

const Notification = ({ message, link, buttonText }) => {
  if (!message) {
    return null;  // Nếu không có message thì không hiển thị component
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
        <p className="text-lg">{message}</p>
        <a 
          href={link} 
          className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default Notification;