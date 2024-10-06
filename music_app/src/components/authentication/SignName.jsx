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
      <span className="SignName-text">Dang ky de </span>
      <span className="SignName-text">bat dau nghe</span>
      <InputItem title="Ten nguoi dung"></InputItem>
      <AuthBtn
        title="Tiep theo"
        link="/authentication/sign-in/signPass"
      ></AuthBtn>
      <div className="Auth-line"></div>
      <ClickableText
        textAcc="Ban da co tai khoan"
        link="/authentication/log-in"
        title="Dang nhap tai day"
      ></ClickableText>
    </div>
  );
};

export default SignName;
