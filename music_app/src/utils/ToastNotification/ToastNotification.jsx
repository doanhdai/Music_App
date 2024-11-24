import React, { useEffect } from "react";

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "1rem 2rem",
        borderRadius: "8px",
        zIndex: 9999,
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
