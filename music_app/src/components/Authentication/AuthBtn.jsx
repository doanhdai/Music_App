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
        if (props.keyLocal != null) {
          localStorage.setItem(props.keyLocal, props.valueLocal);
        }
      }}
    >
      <div className="AuthBtn-title">{props.title}</div>
    </button>
  );
};

export default AuthBtn;
