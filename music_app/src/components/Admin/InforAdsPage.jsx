import React, { useContext, useEffect, useReducer, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from 'react-icons/io';
import { Button } from 'antd';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

let nhadangkyList = [
    { ma_nqc: 'NQC1', ten_nqc: 'MTP Talent', so_dien_thoai: "0123456789" },
    { ma_nqc: 'NQC2', ten_nqc: 'Đông Tây Promotion', so_dien_thoai: "0123456789" },
    { ma_nqc: 'NQC3', ten_nqc: '1989s Production', so_dien_thoai: "0123456789" }
]

let quangcaoList = [
    { ma_quang_cao: '1', ten_quang_cao: 'Chạy ngay đi vừa ra mắt! Nghe thử ngay!', ngay_tao: '23/10/2001', ma_nqc: 'NQC1', hinh_anh: assets.mck },
    { ma_quang_cao: '2', ten_quang_cao: 'Nghe bài hát mới của Sơn Tùng MTP', ngay_tao: '05/02/1998', ma_nqc: 'NQC1', hinh_anh: assets.mck },
    { ma_quang_cao: '3', ten_quang_cao: 'Rap Việt vừa ra mắt! Xem ngay trên trang youtube: Đông Tây Promotion', ngay_tao: '02/01/1996', ma_nqc: 'NQC2', hinh_anh: assets.mck },
    { ma_quang_cao: '4', ten_quang_cao: 'Mộng Yu cùng AMEE! Nghe Mộng Yu ngay!', ngay_tao: '22/07/1990', ma_nqc: 'NQC3', hinh_anh: assets.mck }
]

const actionList = {
    add_cl: "ADD_CL",
    update_cl: "UPDATE_CL",
    delete_cl: "DELETE_CL",
    search_cl: "SEARCH_CL",
    add_tl: "ADD_TL",
    update_tl: "UPDATE_TL",
    delete_tl: "DELETE_TL",
    search_tl: "SEARCH_TL",
    add_cl_cancel: "ADD_CL_CANCEL",
    update_cl_cancel: "UPDATE_CL_CANCEL",
    delete_cl_cancel: "DELETE_CL_CANCEL",
    search_cl_cancel: "SEARCH_CL_CANCEL",
    add_tl_cancel: "ADD_TL_CANCEL",
    update_tl_cancel: "UPDATE_TL_CANCEL",
    delete_tl_cancel: "DELETE_TL_CANCEL",
    search_tl_cancel: "SEARCH_TL_CANCEL",
    select_cl_update: 'SELECT_CL_UPDATE',
    select_tl_update: 'SELECT_TL_UPDATE',
    select_cl_delete: 'SELECT_CL_DELETE',
    select_tl_delete: 'SELECT_TL_DELETE'
};

function reducerBgCover(state, action) {
    switch (action.type) {
        case actionList.add_cl:
        case actionList.update_cl:
        case actionList.add_tl:
        case actionList.update_tl:
            return true;
        default:
            return false;
    }
}

const ManagerType = () => {
    const [keySelected, setKeySelected] = useState("");
    const [valueAction, setValueAction] = useState("");
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);

    useEffect(() => {
        setBgCover(stateBgCover);
    }, [stateBgCover, setBgCover]);

    useEffect(() => {
        if (valueAction === actionList.select_cl_update) {
            alert('Nhấp chuột vào chủng loại cần chọn!');
        } else if (valueAction == actionList.update_cl_cancel) {
            alert('Thoát khỏi chế độ chỉnh sửa chủng loại!');
        } else if (valueAction == actionList.select_tl_update) {
            alert('Nhấp chuột vào thể loại cần chọn!');
        } else if (valueAction == actionList.update_tl_cancel) {
            alert('Thoát khỏi chế độ chỉnh sửa thể loại!');
        } else if (valueAction === actionList.select_cl_delete) {
            alert('Bạn đang ở chế độ xóa chủng loại.\nNhấp chuột vào chủng loại cần xóa!');
        } else if (valueAction == actionList.delete_cl_cancel) {
            alert('Thoát khỏi chế độ xóa chủng loại!');
        } else if (valueAction == actionList.select_tl_delete) {
            alert('Bạn đang ở chế độ xóa thể loại.\nNhấp chuột vào thể loại cần xóa!');
        } else if (valueAction == actionList.delete_tl_cancel) {
            alert('Thoát khỏi chế độ xóa thể loại!');
        }
    }, [valueAction]);

    const handleAction = (action) => {
        setValueAction(action);
        dispatchBgCover({ type: action });
    };

    // function FormAddCL({ placeholder = "", action = actionList.add_cl_cancel }) {
    //     return (
    //         <form className="bg-[#1E1E1E] w-auto p-4">
    //             <p className='text-[#A4A298]'>Nhập tên chủng loại</p>
    //             <input
    //                 className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
    //                 type="text"
    //                 placeholder={placeholder}
    //             />
    //             <p className='text-[#EB2272] italic'></p>
    //             <div className="flex justify-center mt-4 gap-2">
    //                 <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(action)}>Hủy</button>
    //                 <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>

    //                 {/* <Button onClick={() => dispatchBgCover({ type: actionList.add_cl_cancel })}>Hủy</Button>
    //             <Button className="ml-2 bg-[#EB2272] outline-none"></Button> */}
    //             </div>
    //         </form>
    //     );
    // }

    // function FormAddTL({ keySelected = theloaiList[0].ma_the_loai, action = actionList.add_tl_cancel }) {
    //     let array = chungloaiList;
    //     return (
    //         <form className="bg-[#1E1E1E] w-auto p-4">
    //             <div className='flex mt-4 mb-4'>
    //                 <p className='text-[#A4A298]'>Chọn chủng loại</p>
    //                 <select className='bg-[#EB2272] text-white rounded-md border-none w-auto outline-none cursor-pointer ml-4 mr-4 text-center pt-1 pb-1 pr-1 text-sm'>
    //                     {
    //                         chungloaiList.map((chungloai) => {
    //                             const isSelected = theloaiList.some(theloai => theloai.ma_the_loai === keySelected && theloai.ma_chung_loai === chungloai.ma_chung_loai);
    //                             return (
    //                                 <option key={chungloai.ma_chung_loai} selected={isSelected}>
    //                                     {chungloai.ten_chung_loai}
    //                                 </option>
    //                             );
    //                         })
    //                     }
    //                 </select>
    //             </div>
    //             <p className='text-[#A4A298]'>Nhập tên thể loại</p>
    //             <input
    //                 className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
    //                 type="text"
    //             />
    //             <p className='text-[#EB2272] italic'></p>
    //             <div className="flex justify-center mt-4 gap-2">
    //                 <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(action)}>Hủy</button>
    //                 <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>

    //                 {/* <Button onClick={() => dispatchBgCover({ type: actionList.add_cl_cancel })}>Hủy</Button>
    //             <Button className="ml-2 bg-[#EB2272] outline-none"></Button> */}
    //             </div>
    //         </form>
    //     )
    // }

    // const deleteChungLoai = (ma_chung_loai) => {

    //     const isConfirmed = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?");
    //     if (isConfirmed) {
    //         chungloaiList = chungloaiList.filter(chungloai => chungloai.ma_chung_loai !== ma_chung_loai);
    //         alert(`Đã xóa chủng loại có mã: ${ma_chung_loai}`);
    //     } else {

    //     }



    //     // Cập nhật giao diện nếu cần
    // };

    // const deleteTheLoai = (ma_the_loai) => {
    //     const isConfirmed = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?");
    //     if (isConfirmed) {
    //         theloaiList = theloaiList.filter(theloai => theloai.ma_the_loai !== ma_the_loai);
    //         alert(`Đã xóa chủng loại có mã: ${ma_the_loai}`);
    //     } else {

    //     }

    // };

    function ItemNhaDangKy() {
        let array = nhadangkyList;
        return array.map((item) => (
            <div key={item.ma_nqc}
                className={`grid grid-cols-6 w-full items-center pt-2 pb-2 ${(valueAction == actionList.select_cl_update || valueAction == actionList.select_cl_delete) && 'hover:!bg-[#EB2272] cursor-pointer'}`}
                onClick={() => {
                    setKeySelected(item.ma_nqc);
                    switch (valueAction) {
                        case actionList.select_cl_update: handleAction(actionList.update_cl); break;
                        case actionList.select_cl_delete: deleteChungLoai(item.ma_nqc); break;
                        default: break;
                    }

                }}>

                <div className='text-center'>{item.ma_nqc}</div>
                <div className='col-span-3 text-center'>{item.ten_nqc}</div>
                <div className='col-span-2 text-center'>{item.so_dien_thoai}</div>
            </div>
        ));
    }

    function ItemQuangCao() {
        let array1 = quangcaoList;
        let array2 = nhadangkyList;
        return array1.map((quangcao) => (
            <div key={quangcao.ma_quang_cao}
                className={`w-full bg-[#141414] h-auto relative p-2 flex flex-col gap-2 ${(valueAction == actionList.select_tl_update || valueAction == actionList.select_tl_delete) && 'hover:!bg-[#EB2272] cursor-pointer'} `}
                onClick={() => {
                    setKeySelected(quangcao.ma_quang_cao);
                    switch (valueAction) {
                        case actionList.select_tl_update: handleAction(actionList.update_tl); break;
                        case actionList.select_tl_delete: deleteTheLoai(theloai.ma_the_loai); break;
                        default: break;
                    }
                }}>
                <img src={quangcao.hinh_anh} className='w-full h-auto' />
                <h2 className='font-bold text-lg'>{quangcao.ten_quang_cao}</h2>

                {
                    array2.map((item) => (
                        quangcao.ma_nqc == item.ma_nqc && <div className='text-base text-[#A4A298]'>{item.ten_nqc}</div>
                    ))
                }
                <h5 className='text-sm text-[#A4A298]'>Ngày tạo: {quangcao.ngay_tao}</h5>
                <div className='absolute bg-[#EB2272] top-0 left-0 p-2 text-black font-bold'>{quangcao.ma_quang_cao}</div>
            </div>
        ));
    }



    return (
        <div className="grid grid-cols-5 h-auto">
            {/* Phần giao diện cho nhà đăng ký */}
            <div className="col-span-2 pr-[1em] border-r-2 border-[#1E1E1E]">
                <div className='flex justify-between w-full items-center'>
                    <p className='font-bold text-lg'>Nhà đăng ký quảng cáo</p>
                    <div className='flex w-[22%] justify-between'>
                        {/* <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add_cl)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_cl_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_cl_delete ? actionList.delete_cl_cancel : actionList.select_cl_delete)} />
                        </div> */}
                    </div>
                </div>
                <form className='flex w-full h-[40px] items-center mt-6 mb-6'>
                    <div className="flex items-center p-2.5 w-[50%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                        <IoIosSearch className="text-white text-2xl cursor-pointer" />
                        <input
                            className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                            type="text"
                            placeholder="Tên hoặc số điện thoại"
                        />
                    </div>
                    <Button type="primary" className="rounded-full bg-[#E0066F] h-[80%] w-[25%] hover:!bg-[#E0066F] text-sm ml-4 font-normal">
                        Tìm kiếm
                    </Button>
                </form>
                {/* Bảng hiển thị nhà đăng ký */}
                <div className='w-full bg-[#141414]'>
                    <div className='grid grid-cols-6 w-full items-center pt-3 pb-3 border-b border-[#A4A298] text-[#A4A298]'>
                        <div className='text-center'>Mã</div>
                        <div className='col-span-3 text-center'>Tên</div>
                        <div className='col-span-2 text-center'>Số điện thoại</div>
                    </div>
                    <div id="wrap-items-Chungloai">
                        <ItemNhaDangKy />
                    </div>
                </div>
            </div>

            {/* Phần giao diện cho quảng cáo */}
            <div className="col-span-3 pl-[1em] ">
                <div className='flex justify-between w-full items-center'>
                    <p className='font-bold text-lg'>Quảng cáo</p>
                    <div className='flex w-[25%] justify-between'>
                        {/* <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add_tl)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_tl_update ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdOutlineEdit size={25} onClick={() => handleAction(valueAction == actionList.select_tl_update ? actionList.update_tl_cancel : actionList.select_tl_update)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_tl_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_tl_delete ? actionList.delete_tl_cancel : actionList.select_tl_delete)} />
                        </div> */}
                    </div>
                </div>
                <form className='flex w-full h-[40px] items-center mt-6 mb-6'>
                    <div className="flex items-center p-2.5 w-[25%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                        <IoIosSearch className="text-white text-2xl cursor-pointer" />
                        <input
                            className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                            type="text"
                            placeholder="Tên quảng cáo"
                        />
                    </div>
                    <select className="bg-[#1E1E1E] text-white rounded-md border-none w-auto outline-none cursor-pointer ml-4 mr-4 text-center pt-1 pb-1 pr-1 text-sm">
                        {
                            nhadangkyList.map((item) => (
                                <option className="bg-[#1E1E1E] text-white" key={item.ma_nqc}>
                                    {item.ten_nqc}
                                </option>
                            )
                            )
                        }
                    </select>
                    <Button type="primary" className="rounded-full bg-[#E0066F] h-[80%] w-[20%] hover:!bg-[#E0066F] text-sm font-normal">
                        Tìm kiếm
                    </Button>
                </form>
                {/* Bảng hiển thị quảng cáo */}
                <div className='w-full h-[50vh] grid grid-cols-3 gap-2 overflow-y-auto'>
                    <ItemQuangCao />
                </div>
            </div>

            {/* Hiển thị modal hoặc nội dung khác dựa trên valueAction */}
            {stateBgCover && (
                <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                    {
                        (() => {
                            switch (valueAction) {
                                case actionList.add_cl:
                                    return <FormAddCL />
                                case actionList.add_tl:
                                    return <FormAddTL />
                                case actionList.update_cl:
                                    if (keySelected != "")
                                        return <FormAddCL placeholder={keySelected} action={actionList.select_cl_update} />
                                case actionList.update_tl:
                                    if (keySelected != "")
                                        return <FormAddTL keySelected={keySelected} action={actionList.select_tl_update} />



                                default:
                                    return null;
                            }
                        })()
                    }
                </div>
            )}
        </div>
    );
}

export default ManagerType;


