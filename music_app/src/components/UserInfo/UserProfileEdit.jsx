import React from "react";
import { assets } from "../../assets/assets";
const UserProfileEdit = ({onCancel}) => {
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <button className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md" onClick={onCancel}>
        Lưu
      </button>

      <div className="flex justify-center mb-4">
        <img src={assets.img2} alt="Avatar" className="w-36 h-36 bg-gray-400 rounded-full object-cover" />
      </div>

      <div className="flex justify-center mb-6">
        <button className="bg-gray-800 px-4 py-1 rounded-md">Đổi ảnh</button>
      </div>

      <input
        type="text"
        value="RPT MCK"
        className="bg-gray-800 text-white text-center w-full rounded-md px-4 py-2"
        readOnly
      />
    </div>
  );
};

export default UserProfileEdit;
