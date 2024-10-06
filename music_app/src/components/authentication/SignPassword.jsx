import React, { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordRules from "./PasswordRules";
import InputItem from "./InputItem";
import BackBtn from "./BackBtn";
import AuthBtn from "./AuthBtn";

const SignPassword = () => {
  const [password, setPassword] = useState(""); // state chứa giá trị mật khẩu
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
      <div
        className="Auth-line"
        style={{
          marginTop: "20px",
        }}
      ></div>
      <BackBtn link="/authentication/sign-in"></BackBtn>
      <InputItem
        title="Mat khau"
        password={password}
        setPassword={setPassword}
      />
      <PasswordRules password={password} />
      <AuthBtn
        title="Tiep theo"
        link="/authentication/sign-in/signInfo"
      ></AuthBtn>
    </div>
  );
};

export default SignPassword;
