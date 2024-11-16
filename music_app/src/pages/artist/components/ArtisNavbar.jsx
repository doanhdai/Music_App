import React, { useState, startTransition } from "react";
import { IoIosSearch } from "react-icons/io";
import { assets } from "../assets/assets";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ComboIcon from "../../../components/Admin/ComboIcon/ComboIcon";

const ArtistNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="w-full flex justify-between  font-semibold ">
        <h1 className="text-2xl">Trang chu</h1>

        <div className="flex items-center gap-4">

        <ComboIcon/>
        </div>
      </div>
      
    </div>
  );
};

export default ArtistNavbar;
