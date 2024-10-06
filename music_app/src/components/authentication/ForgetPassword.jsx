import React from "react";
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import AuthBtn from "./AuthBtn";
const ForgetPassword = () => {
  return (
    <div className="Auth-form">
      <Logo2></Logo2>
      <div className="Auth-title">Quen mat khau</div>
      <div className="Auth-line"></div>
      <InputItem title="Ten nguoi dung"></InputItem>
      <AuthBtn
        title="Kiem tra"
        link="/authentication/log-in/resetPass"
      ></AuthBtn>
    </div>
  );
};

export default ForgetPassword;
