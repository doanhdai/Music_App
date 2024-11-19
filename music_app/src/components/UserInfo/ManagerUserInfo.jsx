import React, { useEffect, useState } from 'react';
import UserProfileEdit from "./UserProfileEdit";
import AccountProfileEdit from "./AccountProfileEdit";
import UserProfile from "./UserProfile";
import AccountProfile from "./AccountProfile";
import { useNavigate } from 'react-router-dom';


const ManagerUserInfo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, chuyển hướng về trang chủ
      navigate('/'); // hoặc `navigate(config.routes.Home);`
    }
  }, [navigate]);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);

  const accountData = localStorage.getItem('account');
  

// Chuyển đổi chuỗi JSON thành đối tượng JavaScript

  const account = JSON.parse(accountData);
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

    // const token = localStorage.getItem('token');

  return (
    <div className="pt-3 mx-[38px] flex space-x-4">
      <div className="w-1/2">
        {/* <UserProfile />
        <UserProfileEdit /> */}
        {isEditingUser ? (
                <UserProfileEdit onCancel={handleCancelUserClick} />
            ) : (
                <UserProfile onEdit={handleEditUserClick} 
                  name={account.ten_user}
                  image={account.avatar}
                  quyen={account.quyen}
                />
            )}
      </div>
      <div className="w-1/2">
      {isEditingAccount ? (
                <AccountProfileEdit onCancel={handleCancelAccountClick} />
            ) : (
                <AccountProfile onEdit={handleEditAccountClick}
                  email = {account.email}
                  datetime = {account.ngay_tao}
                  password = {account.password}
                 />
            )}
        {/* <AccountProfile />
        <AccountProfileEdit /> */}
        
      </div>
    </div>
  );
};

export default ManagerUserInfo;
