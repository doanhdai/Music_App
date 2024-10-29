import React from "react";
import { FaPen } from "react-icons/fa";
const UserProfile = () => {
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <div className="absolute top-7 right-10 bg-gray-800 px-4 py-1 rounded-full cursor-pointer">
        <FaPen style={{ fontSize: "14px" }} />
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-36 h-36 bg-gray-400 rounded-full"></div>
      </div>
      <div className="text-center text-[#fff] text-[24px] font-bold">
        RPT MCK
      </div>
      <div className="text-center text-[#ccc] text-[16px]">Nghệ sĩ</div>
    </div>
  );
};

export default UserProfile;
