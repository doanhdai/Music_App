import React from "react";
import { FaPen } from "react-icons/fa";
import { assets } from "../../assets/assets";
const UserProfile = ({onEdit}) => {
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <div className="absolute top-4 right-4 bg-gray-800 px-[23px] py-[10px] rounded-md cursor-pointer" onClick={onEdit}>
        <FaPen style={{ fontSize: "14px" }} />
      </div>

      <div className="flex justify-center mb-4">
        <img src={assets.img2} alt="Avatar" className="w-36 h-36 bg-gray-400 rounded-full object-cover" />
      </div>
      <div className="text-center text-[#fff] text-[24px] font-bold">
        RPT MCK
      </div>
      <div className="text-center text-[#ccc] text-[16px]">Nghệ sĩ</div>
    </div>
  );
};

export default UserProfile;
