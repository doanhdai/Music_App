import React from "react";
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import PasswordRules from "./PasswordRules";
import AuthBtn from "./AuthBtn";

const ResetPassword = () => {
  return (
    <div className="Auth-form">
      <Logo2></Logo2>
      <div className="Auth-title">Dat lai mat khau</div>
      <div className="Auth-line"></div>
      <InputItem title="Mat khau"></InputItem>
      <PasswordRules></PasswordRules>
      <AuthBtn title="Tiep theo"></AuthBtn>
    </div>
  );
};

export default ResetPassword;
