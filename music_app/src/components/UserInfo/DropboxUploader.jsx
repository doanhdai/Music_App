import React, { useState } from 'react';
import { Dropbox } from 'dropbox';

function DropboxUploader() {
  const [file, setFile] = useState(null);
  const [shareLink, setShareLink] = useState('');
  
  // Thay thế ACCESS_TOKEN bằng Access Token của bạn từ Dropbox App Console
  const ACCESS_TOKEN = 'sl.CAzP9nMBnB8qz6pnqLhZhtTc4q5hCiLz2jDfhfvtJPVQG9jIb9_NAFk8a2bpQNUju1mJQmiS2QsVlsIqI1sGhU2ns_XO9rKwqEGKCrAUOfl_NHjcgMByy207IlRcv2fJvjVgY16m7xHq-OI';

  // Hàm xử lý chọn tệp
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Hàm upload tệp lên Dropbox và lấy liên kết chia sẻ
  const handleUpload = () => {
    if (!file) return alert('Please select a file first!');

    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    const fileName = `/${file.name}`;

    // Upload tệp lên Dropbox
    dbx.filesUpload({ path: fileName, contents: file })
    .then(response => {
      console.log('File uploaded successfully:', response);

      // Bước 2: Tạo liên kết chia sẻ cho tệp đã upload
      return dbx.sharingCreateSharedLinkWithSettings({ path: fileName });
    })
    .then(sharedLinkResponse => {
      // In toàn bộ phản hồi để kiểm tra cấu trúc
      console.log('Shared Link Response:', sharedLinkResponse);
      const shareLink = sharedLinkResponse.result.url.replace('dl=0', 'dl=1');
      setShareLink(shareLink);
    })
    .catch(error => {
      console.error('Error uploading or creating shared link:', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload to Dropbox</button>
      {shareLink && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">Download Link</a>
        </div>
      )}
    </div>
  );
}

export default DropboxUploader;