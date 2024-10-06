import React from "react";
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import PasswordItem from "./PasswordItem";
import AuthBtn from "./AuthBtn";
import ClickableText from "./ClickableText";

const DisplayLogin = () => {
  return (
    <div className="Auth-form">
      <Logo2></Logo2>
      <div className="Auth-title">Dang nhap</div>
      <div className="Auth-line"></div>
      <InputItem title="Ten dang nhap"></InputItem>
      <InputItem title="mat khau"></InputItem>
      <PasswordItem></PasswordItem>
      <AuthBtn title="Dang nhap"></AuthBtn>
      <ClickableText
        textAcc="Ban chua co tai khoan"
        title="Dang ky Gnine"
        link="/authentication/sign-in"
      ></ClickableText>
    </div>
  );
};

export default DisplayLogin;
