import React, { useState } from "react";
import { uploadImageAPI } from "../../../services/UserServices";

const ImageUpload = ({ initialImage }, ref) => {
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initialImage);
  const uploadImage = async (formData) => {
    try {
      const resImage = await uploadImageAPI(formData);
      console.log('Path image:', resImage.data.path);
      return resImage.data.path;    // Trả về đường dẫn ảnh
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Ném lỗi để xử lý sau
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setAvatarPreview(imageUrl);
  };


  return (
    <div className=" rounded-lg  mr-5 max-w-sm  ">
      <h2 className="text-lg font-semibold text-gray-400 ">Chèn ảnh</h2>
      <input
        type="file"
        id="fileInput" style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div
        id="image-preview"
        className="flex bg-white aspect-square items-center justify-center w-40    rounded-lg cursor-pointer"
        onClick={() => document.getElementById("file-input").click()} // Trigger file input on click
      >
        {avatarPreview ? (

          <img
            src={avatarPreview}
            alt="Uploaded"
            className="aspect-square object-cover rounded-lg"
          />
        ) : (
          <label htmlFor="fileInput" className="text-gray-400">Click để tải ảnh</label>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(ImageUpload);
