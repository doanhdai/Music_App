import React, { useState } from 'react';

const ArtistUser = ({ showModal }) => {
    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null; // Không hiển thị nếu `isOpen` là false
      
        return (
          <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">A NEW SONG IS COMING! ❤️ "APT"</h2>
              <img
                src="https://i.ibb.co/0Q41Z2F/rose-bruno-mars-apt.jpg"
                alt="Rose & Bruno Mars - APT"
                className="w-full rounded-md mb-4"
              />
              <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md">
                Nghe ngay
              </button>
            </div>
          </div>
        );
      };
  const [isModalOpen, setIsModalOpen] = useState(false); // Mặc định mở

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal khi người dùng click "Tắt"
  };
  return (
    <div className="container flex justify-between w-1000px mx-auto">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
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
  );
};

export default ArtistUser;
