import React, { useState } from "react";
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import PasswordRules from "./PasswordRules";
import AuthBtn from "./AuthBtn";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="Auth-form">
      <Logo2></Logo2>
      <div className="Auth-title">Dat lai mat khau</div>
      <div className="Auth-line"></div>

      <InputItem
        title="Mat khau"
        password={password}
        setPassword={setPassword}
      ></InputItem>
      <PasswordRules password={password}></PasswordRules>
      <AuthBtn title="Tiep theo"></AuthBtn>
    </div>
  );
};

export default ResetPassword;
