import React from "react";

const UserProfileEdit = () => {
  return (
    <div className="bg-[#141414] text-white rounded-lg p-6 w-96 relative">
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>

      <button className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md">
        Lưu
      </button>

      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-gray-400 rounded-full"></div>
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
