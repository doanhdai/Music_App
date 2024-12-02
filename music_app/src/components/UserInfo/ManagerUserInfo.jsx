import React, { useEffect, useState } from 'react';
import UserProfileEdit from "./UserProfileEdit";
import AccountProfileEdit from "./AccountProfileEdit";
import UserProfile from "./UserProfile";
import AccountProfile from "./AccountProfile";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagerUserInfo = () => {
  const navigate = useNavigate();
  const [acc, setAcc] = useState("");
  const account = JSON.parse(localStorage.getItem('account'));

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  // Hàm gọi API để lấy thông tin tài khoản
  const getAccount = async (ma_tk) => {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/accounts/${ma_tk}`);
      setAcc(data); // Cập nhật state với dữ liệu tài khoản
    } catch ({ response }) {
      console.error(response?.status === 404 ? "Account not found" : "Error fetching account");
    }
  };

  useEffect(() => {
    getAccount(account.ma_tk); // Lấy tài khoản lần đầu khi component mount
  }, []);

  // useEffect để theo dõi khi `isEditingUser` hoặc `isEditingAccount` thay đổi
  useEffect(() => {
    if (!isEditingUser && !isEditingAccount) {
      getAccount(account.ma_tk); // Gọi lại API khi cả hai trạng thái đều là false
    }
  }, [isEditingUser, isEditingAccount]);

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

  return (
    <div className="pt-3 mx-[38px] flex space-x-4">
      <div className="w-1/2">
        {isEditingUser ? (
          <UserProfileEdit onCancel={handleCancelUserClick} />
        ) : (
          <UserProfile
            onEdit={handleEditUserClick}
            name={acc.user?.ten_user}
            image={acc.user?.anh_dai_dien}
            quyen={acc.phan_quyen?.ten_quyen_han}
          />
        )}
      </div>
      <div className="w-1/2">
        {isEditingAccount ? (
          <AccountProfileEdit onCancel={handleCancelAccountClick} />
        ) : (
          <AccountProfile
            onEdit={handleEditAccountClick}
            email={acc.email}
            datetime={acc.ngay_tao}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerUserInfo;
