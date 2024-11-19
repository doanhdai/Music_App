import React, { useState } from 'react';
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import AuthBtn from "./AuthBtn";
import axios from 'axios';
import Notification from './Notification';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', {email} );
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
      <div className="Auth-title">Quên mật khẩu</div>
      <div className="Auth-line"></div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <InputItem title="Email của bạn" 
          valueInput={email}
          setValueInput={setEmail}></InputItem>
          {message && <p className="text-red-500 text-2xl ml-20">{message}</p>}
        <AuthBtn
          title="Kiểm tra"
        ></AuthBtn>
      </form>
    </div>
  );
};

export default ForgetPassword;
    