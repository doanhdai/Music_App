import React, { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBtn from "./AuthBtn";
import InputItem from "./InputItem";
import ClickableText from "./ClickableText";
const SignEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  function validateEmail(email) {
    if (!email) {
      return false; // Không cho phép email trống
    }
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }
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
      <InputItem title="Email"
        valueInput={email}
        setValueInput={setEmail}
      ></InputItem>
      <AuthBtn
  title="Tiếp theo"
  {...(validateEmail(email) && {
    link: "/authentication/sign-in/signPass",
    keyLocal: "emailSign",
    valueLocal: email
  })}
/>
      <div className="Auth-line"></div>
      <ClickableText
        textAcc="Bạn đã có tài khoản"
        link="/authentication/log-in"
        title="Đăng nhập tại đây"
      ></ClickableText>
    </div>
  );
};

export default SignEmail;
