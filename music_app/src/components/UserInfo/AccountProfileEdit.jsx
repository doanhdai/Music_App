import React, { useEffect, useState } from "react";
import InputItem from "./InputItem";
import PasswordRules from "./PasswordRules";
import { updateAccountAPI } from "../../services/UserServices";
import AuthBtn from "../Authentication/AuthBtn";
import axios from "axios";

const AccountProfileEdit = ({ onCancel }) => {
  const [password, setPassword] = useState("");
  const [passwordComfirm, setPasswordComfirm] = useState("");
  const account = JSON.parse(localStorage.getItem('account'));
  const [email, setEmail] = useState(account.email);

  const validatePassword = (value) => {
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/;
    return (value.length >= 8 && hasDigit.test(value) && hasSpecialChar.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password) {
      if (!validatePassword(password)) {
        console.error("Mật khẩu không hợp lệ.");
        return;
      }
      if (password !== passwordComfirm) {
        console.error("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }
    }

    try {
      const response = await updateAccountAPI(account.ma_tk, email, password || account.password);
      alert('Account updated successfully!');
      console.log(response.data);

      // Cập nhật email trong localStorage
      account.email = email;
      localStorage.setItem('account', JSON.stringify(account));

      // Chỉ gọi onCancel nếu cập nhật thành công
      if (onCancel) onCancel();
      
    } catch (error) {
      if (error.response?.status === 404) {
        alert('Account not found');
      } else {
        console.error('Error updating account:', error);
      }
    }
  };

  return (
    <form className="bg-[#141414] text-white rounded-lg p-6 w-96 relative" onSubmit={handleSubmit}>
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <button
        type="submit" // Đảm bảo nút này có thể submit form
        className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md"
        onClick={(e) => {
          // Ngăn sự kiện mặc định của nút để tránh xung đột
          e.preventDefault();

          // Submit form thủ công
          const form = e.target.closest("form");
          if (form) form.requestSubmit(); // Gửi form thủ công
        }}
      >
        Thoát
      </button>

      <InputItem title="Email" valueInput={email} setValueInput={setEmail} type_input="text" />
      <div className="mt-5" style={{ marginBottom: "-5px", color: "#A4A298" }}>
        Thay đổi mật khẩu
      </div>
      <InputItem
        title="Mật khẩu cũ"
        valueInput={password}
        setValueInput={setPassword}
        type_input="password"
      />
      <InputItem
        title="Mật khẩu mới"
        type_input="password"
        valueInput={passwordComfirm}
        setValueInput={setPasswordComfirm}
      />
      <PasswordRules password={password} />
    </form>
  );
};

export default AccountProfileEdit;
