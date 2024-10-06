import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";
import InputItem from "./InputItem";

const SignInfo = () => {
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
      <BackBtn link="/authentication/sign-in/signPass"></BackBtn>
      <span className="SignInfo-text">
        Gioi thieu thong tin ve ban than ban
      </span>
      <InputItem title="Ten">
        <div className="input-describe">
          Ten nay se xuat hien trong ho so cua ban
        </div>
      </InputItem>
      <div className="avatarWrap">
        <div className="avatar-title">Anh dai dien</div>
        <div className="avatar-describe">chon anh ban muon</div>
        <div className="fileWrap">
          <div className="file-describe">Anh cua ban</div>
          <div className="file-btn">
            <span className="file-btn_title">Chon tep</span>
          </div>
        </div>
        <div className="avatar-frame"></div>
      </div>
    </div>
  );
};

export default SignInfo;
