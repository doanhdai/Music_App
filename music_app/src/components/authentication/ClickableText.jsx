import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";

const ClickableText = (props) => {
  const navigate = useNavigate();
  return (
    <div className="ClickableText-container">
      <span className="ClickableText-text">{props.textAcc}</span>
      <div
        className="ClickableText-link"
        onClick={() => {
          startTransition(() => {
            navigate(props.link);
          });
        }}
      >
        {props.title}
      </div>
    </div>
  );
};

export default ClickableText;
