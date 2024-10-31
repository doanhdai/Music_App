import React from "react";
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
  return (
    <div className="pt-3 mx-[38px] flex space-x-4">
      <div className="w-1/2">
        <UserProfile />
        <UserProfileEdit />
      </div>
      <div className="w-1/2">
        <AccountProfile />
        <AccountProfileEdit />
      </div>
    </div>
  );
};

export default ManagerUserInfo;
