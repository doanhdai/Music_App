import React, { useState } from "react";
import Logo2 from "./Logo2";
import InputItem from "./InputItem";
import PasswordItem from "./PasswordItem";
import AuthBtn from "./AuthBtn";
import ClickableText from "./ClickableText";
import { loginAPI } from "../../services/UserServices";

const DisplayLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    // alert('me');
    // if (!email || !password ){
    //   toast.error('Email/Password is required!');
    //   return;
    // }
    // e.preventDefault();

    await loginAPI(email, password).then(response => {
      if (response.data.account) {
        // Lưu thông tin tài khoản vào localStorage
        localStorage.setItem('account', JSON.stringify(response.data.account));
        localStorage.setItem('isLoggedIn', 'true');
        // Chuyển hướng đến trang chủ
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
        }
      }
    })
      .catch(error => {
        console.error('Đăng nhập thất bại:', error.response?.data?.message);
      });
  }

  return (

    <div className="Auth-form">
      <Logo2></Logo2>
      <div className="Auth-title">Dang nhap</div>
      <div className="Auth-line"></div>
      <form onSubmit={handleLogin} className='flex flex-col'>
        <InputItem
          title="Email"
          valueInput={email}
          setValueInput={setEmail}
          show={null}
        ></InputItem>
        <InputItem
          title="Mật khẩu"
          valueInput={password}
          setValueInput={setPassword}
          show={show}
          setShow={setShow}
        ></InputItem>
        <PasswordItem></PasswordItem>
        <AuthBtn title="Đăng nhập"></AuthBtn>
        {message && <p className="text-red-500 text-2xl ml-20">{message}</p>}
      </form>
      <ClickableText
        textAcc="Bạn chưa có tài khoản"
        title="Đăng ký Gnine"
        link="/authentication/sign-in"
      ></ClickableText>
    </div>
  );
};

export default DisplayLogin;
