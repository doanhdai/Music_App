import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfileEdit from "./UserProfileEdit";
import AccountProfileEdit from "./AccountProfileEdit";
import UserProfile from "./UserProfile";
import AccountProfile from "./AccountProfile";



const ManagerUserInfo = () => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu người dùng
    axios.get('http://127.0.0.1:8000/api/accounts')
      .then(response => {
        setUserData(response.data); // Lưu dữ liệu người dùng vào state
        setLoading(false);
      })
      .catch(error => {
        setError(error.message); // Xử lý lỗi nếu có
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    const handleEditUserClick = () => {
        setIsEditingUser(true);
    };

    const handleCancelUserClick = () => {
        setIsEditingUser(false);
    };

    

    const handleEditAccountClick = () => {
        setIsEditingAccount(true);
    };

    const handleCancelAccountClick = () => {
        setIsEditingAccount(false);
    };

    const token = localStorage.getItem('token');

axios.get('http://127.0.0.1:8000/api/account', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => {
  console.log('Thông tin người dùng:', response.data);
})
.catch(error => {
  console.error('Lỗi khi lấy thông tin người dùng:', error);
});
  return (
    <div className="pt-3 mx-[38px] flex space-x-4">
      <div className="w-1/2">
        {/* <UserProfile />
        <UserProfileEdit /> */}
        {isEditingUser ? (
                <UserProfileEdit onCancel={handleCancelUserClick} />
            ) : (
                <UserProfile onEdit={handleEditUserClick} />
            )}
      </div>
      <div className="w-1/2">
      {isEditingAccount ? (
                <AccountProfileEdit onCancel={handleCancelAccountClick} />
            ) : (
                <AccountProfile onEdit={handleEditAccountClick} />
            )}
            
            {userData.length > 0 ? (
        <ul>
          {userData.map((user, index) => (
            <li key={index}>
              <h3>Người dùng {index + 1}</h3>
              <p><strong>Mã tài khoản:</strong> {user.ma_tk}</p>
              <p><strong>Email:</strong> {user.gmail}</p>
              <p><strong>Mật khẩu:</strong> {user.mat_khau}</p>
              <p><strong>Ngày tạo:</strong> {user.ngay_tao}</p>
              <p><strong>Trạng thái:</strong> {user.trang_thai === 1 ? "Hoạt động" : "Không hoạt động"}</p>
              <p><strong>Mã phân quyền:</strong> {user.ma_phan_quyen}</p>
              <p><strong>Phân quyền:</strong> {user.phan_quyen || "Chưa có"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có dữ liệu người dùng</p>
      )}
        {/* <AccountProfile />
        <AccountProfileEdit /> */}
        
      </div>
    </div>
  );
};

export default ManagerUserInfo;
