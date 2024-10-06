import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
const BackBtn = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="BackBtn-container"
      onClick={() => {
        startTransition(() => {
          navigate(props.link);
        });
      }}
    >
      <FaChevronLeft className="BackBtn-icon" />
      <span className="BackBtn-text">Quay về</span>
    </div>
  );
};

export default BackBtn;
