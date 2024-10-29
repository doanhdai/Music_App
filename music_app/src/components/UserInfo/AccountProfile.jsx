import React from "react";
import InputItem from "./InputItem";
import { FaPen } from "react-icons/fa";

const AccountProfile = () => {
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>
      <div className="absolute top-7 right-40 bg-gray-800 px-4 py-4 rounded-full cursor-pointer">
        <FaPen style={{ fontSize: "14px" }} />
      </div>
      <div className="flex mt-4">
        <div className="font-bold text-[#fff] text-[16px]">Email: </div>
        <div className="text-[#ccc] text-[16px] ml-2">abc@gmail.com</div>
      </div>
      <div className="flex mt-4">
        <div className="font-bold text-[#fff] text-[16px]">Mật khẩu: </div>
        <div className="text-[#ccc] text-[16px] ml-2">************</div>
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
