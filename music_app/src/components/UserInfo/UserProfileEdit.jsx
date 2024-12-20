import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { updateUserAPI, uploadImage } from "../../services/UserServices";
import AuthBtn from "../Authentication/AuthBtn";
const UserProfileEdit = ({onCancel}) => {
  const account = JSON.parse(localStorage.getItem('account'));
  const [useName, setUseName] = useState(account.ten_user);
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setAvatarPreview(imageUrl);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Tạo formData từ file đã chọn
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      // Gọi uploadImage và đợi đường dẫn ảnh trả về
      const avatar = avatarPreview ? await uploadImage(formData) : account.avatar;
      // Cập nhật avatar và gọi API updateUserAPI
      const response = await updateUserAPI(account.ma_tk, useName, avatar);
      alert('User updated successfully!');
      console.log(response.data);
  
      // Cập nhật thông tin vào localStorage
      account.ten_user = useName;
      account.avatar = avatar;
      localStorage.setItem('account', JSON.stringify(account));
      if (onCancel) onCancel();
    } catch (error) {
      if (error.response?.status === 404) {
        alert('User not found');
      } else {
        console.error('Error updating user:', error);
      }
    }
  };
  return (
    <form className="bg-[#141414] text-white rounded-lg p-6 w-96 relative z-0" onSubmit={handleSubmit}>
      <h2 className="text-pink-500 font-bold mb-6">Thông tin cá nhân</h2>
      <button
        type="submit" // Đảm bảo nút này có thể submit form
        className="absolute top-4 right-4 bg-gray-800 px-4 py-1 rounded-md"
        onClick={(e) => {
          // Ngăn sự kiện mặc định của nút để tránh xung đột
          e.preventDefault();

          // Submit form thủ công
          const form = e.target.closest("form");
          if (form) form.requestSubmit(); // Gửi form thủ công
        }}
      >
        Thoát
      </button>

      <div className="flex justify-center mb-4">
        <img src={avatarPreview ? avatarPreview : account.avatar} alt="Avatar" className="w-36 h-36 bg-gray-400 rounded-full object-cover" />
      </div>

      
      <div className="flex justify-center mb-6">
        <label htmlFor="fileInput" className="bg-gray-800 px-4 py-1 rounded-md">Đổi ảnh</label>
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      <input
        type="text"
        value={useName}
        onChange={(e) => setUseName(e.target.value)}
        className="bg-gray-800 text-white text-center w-full rounded-md px-4 py-2"
      />
      {/* <AuthBtn title="Xác nhận" /> */}
    </form>
  );
};

export default UserProfileEdit;