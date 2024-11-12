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
        Giới thiệu thông tin về bản thân
      </span>
      <InputItem title="Tên">
        <div className="input-describe">
        Tên này sẽ xuất hiện trong hồ sơ của bạn
        </div>
      </InputItem>
      <div className="avatarWrap">
        <div className="avatar-title">Ảnh đại diện</div>
        <div className="avatar-describe">Chọn ảnh bạn muốn</div>
        <div className="fileWrap">
          <div className="file-describe">Ảnh của bạn</div>
          <div className="file-btn">
            <span className="file-btn_title">Chọn tệp</span>
          </div>
        </div>
        <div className="avatar-frame"></div>
      </div>
    </div>
  );
};

export default SignInfo;
