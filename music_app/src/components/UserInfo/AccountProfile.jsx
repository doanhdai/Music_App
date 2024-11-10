import React, { useState } from "react";
import InputItem from "./InputItem";
import { FaPen } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
const AccountProfile = ({onEdit}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>
      <div className="absolute top-4 right-4 bg-gray-800 px-[23px] py-[10px] rounded-md cursor-pointer" onClick={onEdit}>
        <FaPen style={{ fontSize: "14px" }}/>
      </div>
      <div className="flex mt-4">
        <div className="font-bold text-[#fff] text-[16px]">Email: </div>
        <div className="text-[#ccc] text-[16px] ml-2">abc@gmail.com</div>
      </div>
      <div className="flex mt-4">
        <div className="font-bold text-[#fff] text-[16px]">Mật khẩu: </div>
        <input type={isPasswordVisible ? "text" : "password"} value="12345678" className="text-[#ccc] text-[16px] ml-2 bg-transparent focus:outline-none" readOnly/>
        <button type="button" onClick={togglePasswordVisibility} className="absolute top-[119px] right-14 flex items-center text-gray-500">{isPasswordVisible ? <FiEyeOff /> : <FiEye />}</button>
      </div>
      <div className="flex mt-4">
        <div className="font-bold text-[#fff] text-[16px]">
          Ngày tạo tài khoản:{" "}
        </div>
        <div className="text-[#ccc] text-[16px] ml-2">08/09/2004</div>
      </div>
    </div>
  );
};

export default AccountProfile;
