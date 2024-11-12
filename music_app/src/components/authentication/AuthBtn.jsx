import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
const AuthBtn = (props) => {
  const navigate = useNavigate();
  return (
    <button type="submit"
      className="AuthBtn-container"
      onClick={() => {
        startTransition(() => {
          navigate(props.link);
        });
      }}
    >
      <div className="AuthBtn-title">{props.title}</div>
    </button>
  );
};

export default AuthBtn;
