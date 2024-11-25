import React, { useState } from 'react';
import AdModal from '../AdModal';

const ArtistUser = () => {
    
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <AdModal isOpen={isModalOpen} onClose={handleCloseModal} title="Anh Phuong Tuan" urlImage="https://replus.com.vn/wp-content/uploads/2022/07/Dich-vu-thiet-ke-thuong-hieu-hinh-anh-quang-cao.png" /> */}
      <div className="container flex justify-between w-1000px mx-auto">
      
      <div className="left-side bg-[#141414] text-white p-4 rounded-md min-w-[700px] flex flex-col">
        <h2 className="text-2xl font-bold mb-2 mx-auto">Đăng ký trở thành nghệ sĩ trên Gnine</h2>
        <p className="mb-4 ml-2">
          <span className="text-[#A4A298]">Gửi thông tin đến Gnine:</span> contactGnine@gmail.com
        </p>
        <p className="mb-4 ml-2 text-[#A4A298]">Thông tin gửi gồm</p>
        <ul className="list-none pl-4">
          <li className="mb-2">+ Gmail đăng nhập tài khoản</li>
          <li className="mb-2">+ Tên người dùng tương ứng với gmail đăng nhập</li>
          <li className="mb-2">+ Các sản phẩm âm nhạc liên quan</li>
        </ul>
        <p className="mb-4">Tài khoản sẽ được nâng cấp lên nghệ sĩ nếu vượt qua kiểm duyệt của Gnine</p>
        <p>Cảm ơn bạn vì đã chọn Gnine!</p>
      </div>
      <div className="right-side bg-[#141414] text-white p-4 rounded-md min-w-[500px]">
        <h2 className="text-2xl font-bold mb-2">Quyền lợi của tài khoản nghệ sĩ</h2>
        <ul className="pl-4 list-none">
          <li className="mb-2">+ Đăng tải nhạc, album</li>
          <li className="mb-2">+ Quản lý nhạc, album</li>
          <li className="mb-2">+ Nhận tiền từ các bài hát đăng tải</li>
          <li className="mb-2">+ Xem thống kê về doanh thu và lượt nghe mỗi bài hát</li>
        </ul>
      </div>
    </div>
    </>
    
  );
};

export default ArtistUser;
