import React, { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordRules from "./PasswordRules";
import InputItem from "./InputItem";
import BackBtn from "./BackBtn";
import AuthBtn from "./AuthBtn";

const SignPassword = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function validatePassword(value) {
    const hasDigit = /\d/;
    const hasUppercase = /[A-Z]/;
    const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/;

    return (value.length >= 8 && hasDigit.test(value) && hasSpecialChar.test(value));
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
      <div
        className="Auth-line"
        style={{
          marginTop: "20px",
        }}
      ></div>
      <BackBtn link="/authentication/sign-in" keyLocal="emailSign"></BackBtn>
      <InputItem
        title="Mật khẩu"
        valueInput={password}
        setValueInput={setPassword}
        show={show}
        setShow={setShow}
      />
      <PasswordRules password={password} />
      <AuthBtn
        title="Tiếp theo"
        {...(validatePassword(password) && {
          link: "/authentication/sign-in/signInfo",
          keyLocal: "passwordSign",
          valueLocal: password
        })}
      ></AuthBtn>
    </div>
  );
};

export default SignPassword;
