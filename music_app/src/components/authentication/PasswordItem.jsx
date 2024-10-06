import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
const PasswordItem = () => {
  const navigate = useNavigate();
  return (
    <div className="pass-wrap">
      <div className="remember-item">
        <input type="checkbox" className="chk-item" id="chk-item" />
        <label className="chk-title" for="chk-item">
          Nho mat khau
        </label>
      </div>
      <div
        className="forget-item"
        onClick={() => {
          startTransition(() => {
            navigate("/authentication/log-in/forgetPass");
          });
        }}
      >
        Quen mat khau?
      </div>
    </div>
  );
};

export default PasswordItem;
