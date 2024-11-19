import React from "react";
import CheckBox from "../Authentication/CheckBox";
const PasswordRules = ({ password }) => {
  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/g.test(password);

  return (
    <div className="PasswordRules-container" style={{ marginLeft: "3px" }}>
      <div className="PasswordRules-title">
        Mật khẩu của bạn phải có ít nhất
      </div>
      <CheckBox boolean={minLength} title="8 ký tự"></CheckBox>
      <CheckBox boolean={hasSpecialChar} title="1 ký tự đặc biệt"></CheckBox>
      <CheckBox boolean={hasNumber} title="1 chữ số"></CheckBox>
    </div>
  );
};

export default PasswordRules;
