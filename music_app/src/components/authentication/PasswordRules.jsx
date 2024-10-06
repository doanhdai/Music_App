import React from "react";
import CheckBox from "./CheckBox";
const PasswordRules = ({ password }) => {
  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  return (
    <div className="PasswordRules-container">
      <div className="PasswordRules-title">
        Mat khau cua ban phai co it nhat
      </div>
      <CheckBox boolean={minLength} title="8 ky tu"></CheckBox>
      <CheckBox boolean={hasUpperCase} title="Mot chu viet hoa"></CheckBox>
      <CheckBox boolean={hasNumber} title="Mot ky tu so"></CheckBox>
    </div>
  );
};

export default PasswordRules;
