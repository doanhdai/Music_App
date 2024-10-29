import React, { useState } from "react";
import InputItem from "./InputItem";
import PasswordRules from "../Authentication/PasswordRules";

const AccountProfileEdit = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <button className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md">
        Lưu
      </button>
      <InputItem title="Email" />
      <div className="mt-5" style={{ marginBottom: "-5px", color: "#A4A298" }}>
        Thay đổi mật khẩu
      </div>
      <InputItem
        title="Mật khẩu cũ"
        password={password}
        setPassword={setPassword}
      />
      <InputItem title="Mật khẩu mới" />
      <PasswordRules password={password} />
    </div>
  );
};

export default AccountProfileEdit;
