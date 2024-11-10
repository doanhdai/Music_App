import React, { useState } from "react";

const ImageUpload = ({initialImage}, ref) => {
  const [image, setImage] = useState(initialImage);
  React.useImperativeHandle(ref, () => ({
    getData: getData,
  }));

  const getData = () => {
    return image;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Set the uploaded image URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" rounded-lg  mr-5 max-w-sm  ">
      <h2 className="text-lg font-semibold text-gray-400 ">Chèn ảnh</h2>
      <input
        type="file"
        id="file-input"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div
        id="image-preview"
        className="flex bg-white aspect-square items-center justify-center w-40   border-2  rounded-lg cursor-pointer"
        onClick={() => document.getElementById("file-input").click()} // Trigger file input on click
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="aspect-square object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400">Click để tải ảnh</span>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(ImageUpload);
