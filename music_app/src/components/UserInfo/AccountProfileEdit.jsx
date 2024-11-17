import React, { useState } from "react";
import InputItem from "./InputItem";
import PasswordRules from "./PasswordRules";

const AccountProfileEdit = ({onCancel}) => {
  const [password, setPassword] = useState("");
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <button className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md" onClick={onCancel}>
        Lưu
      </button>
      <InputItem title="Email" type_input="text" />
      <div className="mt-5" style={{ marginBottom: "-5px", color: "#A4A298" }}>
        Thay đổi mật khẩu
      </div>
      <InputItem
        title="Mật khẩu cũ"
        password={password}
        setPassword={setPassword}
        type_input="password" 
      />
      
      <InputItem title="Mật khẩu mới" type_input="password" />
      <PasswordRules password={password} />
    </div>
  );
};

export default AccountProfileEdit;
