import React from 'react';
import { FaRegBell } from 'react-icons/fa6';
import Select from 'react-select'; // Sử dụng react-select nếu bạn chưa có SelectBox component tùy chỉnh

const HeaderAdmin = () => {
    const dropDownOptions = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    return (
        <header className='flex justify-between items-center gap-5'>
            <p className='text-[25px] font-bold text-pink-500 sm:text-[20px]'>Quản lí tài khoản</p>
            <div className='flex items-center gap-5'>
                <FaRegBell size={25} />
                <p className='font-bold'>Admin</p>
                {/* <Select
                    name="Admin Dropdown"
                    placeholder={`admin`}
                    options={dropDownOptions}
                    className="w-[62%] font-bold"
                /> */}
            </div>
        </header>
    );
}

export default HeaderAdmin;
