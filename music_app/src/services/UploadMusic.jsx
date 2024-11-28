import React from 'react';
import { Dropbox } from 'dropbox';

const UploadMusic = ({
  quality,
  file, 
  accessToken 
}) => {
  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Vui lòng chọn tệp!'));
        return;
      }

      const dbx = new Dropbox({ accessToken });
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${now
          .getDate()
          .toString()
          .padStart(2, "0")}`;
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      const originalName = file.name;

      // Tách tên chính và đuôi file
      const lastDotIndex = originalName.lastIndexOf(".");
      const baseName = originalName.substring(0, lastDotIndex);
      const fileExtension = originalName.substring(lastDotIndex);

      // Tạo tên file mới
      const fileName = `/${formattedDate}_${formattedTime}_${baseName}_${quality}${fileExtension}`;

      // Upload tệp lên Dropbox
      dbx.filesUpload({ path: fileName, contents: file })
      .then(response => {
        // Tạo liên kết chia sẻ cho tệp đã upload
        return dbx.sharingCreateSharedLinkWithSettings({ path: fileName });
      })
      .then(sharedLinkResponse => {
        // Chuyển đổi liên kết để có thể tải trực tiếp
        const shareLink = sharedLinkResponse.result.url.replace('dl=0', 'dl=1');
        
        // Resolve promise với shareLink
        resolve(shareLink);
      })
      .catch(error => {
        console.error('Lỗi upload hoặc tạo liên kết:', error);
        reject(error);
      });
    });
  };

  return handleUpload;
};

export default UploadMusic;