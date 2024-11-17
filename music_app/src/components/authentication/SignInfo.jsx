import React, { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";
import InputItem from "./InputItem";
import AuthBtn from "./AuthBtn";
import { createAccountAPI, uploadImageAPI } from "../../services/UserServices";

const SignInfo = () => {
  const navigate = useNavigate();
  const [ten_user,setTenUser] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('http://127.0.0.1:8000/storage/images/AvatarDefault.png');
  const [imagePreview, setImagePreview] = useState(null);

  const uploadImage = async (formData) =>{
    try {
      const resImage = await uploadImageAPI(formData)
      console.log('Path image:', resImage.data.path);
      setImageUrl(resImage.data.path);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const createAccount = async (accountData) => {
    try {
      const response = await createAccountAPI(accountData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error creating the user:', error.response.data);
    }
  };

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImagePreview(imageUrl);
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    uploadImage(formData)
    const account = {
      ten_user: ten_user,
      email: localStorage.getItem('emailSign'),
      password: localStorage.getItem('passwordSign'),
      avatar: imageUrl
    };
    
    createAccount(account);
    localStorage.removeItem('emailSign');
    localStorage.removeItem('passwordSign');
  };

  

  return (
    <form className="Auth-form" onSubmit={handleSubmit}>
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
      <BackBtn link="/authentication/sign-in/signPass" keyLocal="passwordSign"></BackBtn>
      <span className="SignInfo-text">
        Giới thiệu thông tin về bản thân
      </span>
      <InputItem title="Tên"
        valueInput ={ten_user}
        setValueInput = {setTenUser}
      >
        <div className="input-describe">
        Tên này sẽ xuất hiện trong hồ sơ của bạn
        </div>
      </InputItem>
      <div className="avatarWrap">
        <div className="avatar-title">Ảnh đại diện</div>
        <div className="avatar-describe">Chọn ảnh bạn muốn</div>
        <div className="fileWrap">
          <div className="file-describe">Ảnh của bạn</div>
          <label htmlFor="fileInput" className="file-btn">Chọn ảnh</label>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
        <div><img src={imagePreview ? imagePreview : imageUrl} alt="Uploaded" className="w-[100px] h-[100px] mt-5 mx-auto object-cover" /></div>
      </div>
      <AuthBtn
        title="Tiếp theo"
        // {...(validatePassword(password) && {
        // link: "/authentication/sign-in/signInfo",
        // keyLocal: "passwordSign",
        // valueLocal: password
        // })}
      ></AuthBtn>
    </form>
  );
};

export default SignInfo;
