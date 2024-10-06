import { CiSearch } from "react-icons/ci";
import { BsPlusCircleFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";
import { FaTrash } from "react-icons/fa";
import { BsSendPlus } from "react-icons/bs";

const ManageBar = (props) => {
  return (
    <div className="grid grid-cols-2 justify-center ">
      <form action="">
        <div className="flex items-center p-1 w-[500px] bg-[#1E1E1E] justify-between rounded-3xl">
          <CiSearch className="text-3xl font-bold" />
          <input
            className="bg-inherit w-[100%] outline-none ml-3"
            type="text"
            placeholder="Tìm kiếm bài hát, album,..."
          />
        </div>
      </form>

      <div className="flex flex-row justify-end gap-7 pr-10 align-middle">
        <div className="relative h-10 w-10 rounded-full bg-[#1E1E1E] text-white">
        <BsSendPlus className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div>
        <div className="relative text-3xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white">
          <GoPlus className="absolute text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div>

        <div className="relative text-xl   h-10 w-10 rounded-full bg-[#1E1E1E]  text-white">
        <TfiPencil className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div> 
        <div className="relative  text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white">
        <FaTrash className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div> 
      </div>
    </div>
  );
};
export default ManageBar;
