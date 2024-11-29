import React from "react";
import ComboIcon from "../Admin/ComboIcon/ComboIcon";
// import ComboIcon from "../Admin/ComboIcon/ComboIcon";

const HeaderUserInfo = () => {
  // const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full flex justify-between items-center font-semibold">
      <p className="text-[25px] font-bold text-pink-500 sm:text-[20px]">
        Quản lí tài khoản
      </p>
      <div className="flex items-center gap-4">
        <ComboIcon />
      </div>
    </header>
  );
};

export default HeaderUserInfo;
