import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import InputItem from "./InputItem";
import ClickableText from "./ClickableText";
const SignName = () => {
  const navigate = useNavigate();
  return (
    <div className="Auth-form">
      <span
        className="logo-item"
        onClick={() => {
          startTransition(() => {
            navigate("/");
          });
        }}
      ></span>
      <span className="SignName-text">Đăng ký để </span>
      <span className="SignName-text">bắt đầu nghe</span>
      <InputItem title="Email"></InputItem>
      <AuthBtn
        title="Tiếp theo"
        link="/authentication/sign-in/signPass"
      ></AuthBtn>
      <div className="Auth-line"></div>
      <ClickableText
        textAcc="Bạn đã có tài khoản"
        link="/authentication/log-in"
        title="Đăng nhập tại đây"
      ></ClickableText>
    </div>
  );
};

export default SignName;
