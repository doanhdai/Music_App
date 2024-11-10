import React, { useState } from "react";
import { Button } from "antd";

import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { albumsData, assets, songsData } from "../../assets/assets";
import { Link } from "react-router-dom";
import UserProfileEdit from "./UserProfileEdit";
import AccountProfileEdit from "./AccountProfileEdit";
import UserProfile from "./UserProfile";
import AccountProfile from "./AccountProfile";

const ManagerUserInfo = () => {
  const [isEditingUser, setIsEditingUser] = useState(false);

    const handleEditUserClick = () => {
        setIsEditingUser(true);
    };

    const handleCancelUserClick = () => {
        setIsEditingUser(false);
    };

    const [isEditingAccount, setIsEditingAccount] = useState(false);

    const handleEditAccountClick = () => {
        setIsEditingAccount(true);
    };

    const handleCancelAccountClick = () => {
        setIsEditingAccount(false);
    };
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
        {/* <AccountProfile />
        <AccountProfileEdit /> */}
      </div>
    </div>
  );
};

export default ManagerUserInfo;
