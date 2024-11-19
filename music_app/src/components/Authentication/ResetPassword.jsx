import React, { useState } from 'react';
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import PasswordRules from "./PasswordRules";
import AuthBtn from "./AuthBtn";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Notification from './Notification';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
        token,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Đã xảy ra lỗi');
    }
  };
  return (
    <div className="Auth-form">
      {/* <Notification 
        message={message} 
        link="/" 
        buttonText="Về trang chủ" 
      /> */}
      <Logo2></Logo2>
      <div className="Auth-title">Đặt lại mật khẩu</div>
      <div className="Auth-line"></div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <InputItem
          title="Mật khẩu"
          valueInput={password}
          setValueInput={setPassword}
        ></InputItem>
        <InputItem
          title="Xác nhận mật khẩu"
          valueInput={confirmPassword}
          setValueInput={setConfirmPassword}
        ></InputItem>
        <PasswordRules password={password}></PasswordRules>
        <AuthBtn title="Tiếp theo"></AuthBtn>
      </form>
      {message && <p className="text-red-500 text-2xl ml-20">{message}</p>}
    </div>
  );
};

export default ResetPassword;
