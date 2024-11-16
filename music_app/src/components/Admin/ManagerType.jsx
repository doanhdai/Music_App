import React, { useContext, useEffect, useReducer, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from 'react-icons/io';
import { Button } from 'antd';
import { AdminContext } from '../../context/AdminContext';



let theloaiList = [
    { ma_the_loai: 'TL1', ten_the_loai: 'POP', ngay_tao: '23/10/2001', ma_chung_loai: 'CL2' },
    { ma_the_loai: 'TL2', ten_the_loai: 'R&B', ngay_tao: '05/02/1998', ma_chung_loai: 'CL2' },
    { ma_the_loai: 'TL3', ten_the_loai: 'Bolero', ngay_tao: '02/01/1996', ma_chung_loai: 'CL1' },
    { ma_the_loai: 'TL4', ten_the_loai: 'Romantic', ngay_tao: '22/07/1990', ma_chung_loai: 'CL3' }
]

const theloai_baihat = [
    { ma_bai_hat: 'abc', ma_the_loai: 'TL1' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL2' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL3' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL4' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL4' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL3' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL2' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL2' },
    { ma_bai_hat: 'abc', ma_the_loai: 'TL2' }
]
const actionList = {
    update_tl: "UPDATE_TL",
    delete_tl: "DELETE_TL",
    search_tl: "SEARCH_TL",
    add_tl_cancel: "ADD_TL_CANCEL",
    update_tl_cancel: "UPDATE_TL_CANCEL",
    delete_tl_cancel: "DELETE_TL_CANCEL",
    search_tl_cancel: "SEARCH_TL_CANCEL",
    select_tl_update: 'SELECT_TL_UPDATE',
    select_tl_delete: 'SELECT_TL_DELETE'
};

function reducerBgCover(state, action) {
    switch (action.type) {
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
        if (valueAction == actionList.select_tl_update) {
            alert('Nhấp chuột vào thể loại cần chọn!');
        } else if (valueAction == actionList.update_tl_cancel) {
            alert('Thoát khỏi chế độ chỉnh sửa thể loại!');
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



    function FormAddTL({ keySelected = theloaiList[0].ma_the_loai, action = actionList.add_tl_cancel }) {
        return (
            <form className="bg-[#1E1E1E] w-auto p-4">
                <p className='text-[#A4A298]'>Nhập tên thể loại</p>
                <input
                    className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                />
                <p className='text-[#EB2272] italic'></p>
                <div className="flex justify-center mt-4 gap-2">
                    <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(action)}>Hủy</button>
                    <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>

                    {/* <Button onClick={() => dispatchBgCover({ type: actionList.add_cl_cancel })}>Hủy</Button>
                <Button className="ml-2 bg-[#EB2272] outline-none"></Button> */}
                </div>
            </form>
        )
    }



    const deleteTheLoai = (ma_the_loai) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?");
        if (isConfirmed) {
            theloaiList = theloaiList.filter(theloai => theloai.ma_the_loai !== ma_the_loai);
            alert(`Đã xóa thể loại có mã: ${ma_the_loai}`);
        } else {

        }

    };



    function ItemTheloai() {
        let array1 = theloaiList;
        let array2 = theloai_baihat;

        return array1.map((theloai) => {
            // Calculate the count of matching items for each `theloai`
            let sum = array2.reduce((count, chitiet) => {
                return chitiet.ma_the_loai === theloai.ma_the_loai ? count + 1 : count;
            }, 0);

            return (
                <div
                    key={theloai.ma_the_loai}
                    className={`grid grid-cols-8 w-full items-center pt-3 pb-3 ${(valueAction === actionList.select_tl_update || valueAction === actionList.select_tl_delete) && 'hover:!bg-[#EB2272] cursor-pointer'
                        }`}
                    onClick={() => {
                        setKeySelected(theloai.ma_the_loai);
                        switch (valueAction) {
                            case actionList.select_tl_update:
                                handleAction(actionList.update_tl);
                                break;
                            case actionList.select_tl_delete:
                                deleteTheLoai(theloai.ma_the_loai);
                                break;
                            default:
                                break;
                        }
                    }}
                >
                    <div className="text-center">{theloai.ma_the_loai}</div>
                    <div className="col-span-3 text-center">{theloai.ten_the_loai}</div>
                    <div className="col-span-2 text-center">{theloai.ngay_tao}</div>
                    <div className="col-span-2 text-center">{sum}</div>
                </div>
            );
        });
    }




    return (
        <div className="mt-2 bg-black h-[100%]">

            {/* Phần giao diện cho thể loại */}
            <div className="col-span-3 pl-[1em] pr-[1em]">
                <div className='flex justify-between w-full items-center'>
                    <form className='flex w-full h-full items-center mt-6 mb-6 gap-2'>
                        <div className="flex items-center p-2.5 w-[25%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                            <IoIosSearch className="text-white text-2xl cursor-pointer" />
                            <input
                                className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                                type="text"
                                placeholder="Tên thể loại"
                            />
                        </div>
                        <Button type="primary" className="rounded-full bg-[#E0066F] h-[80%] w-fit hover:!bg-[#E0066F] text-sm font-normal py-2">
                            Tìm kiếm
                        </Button>
                    </form>
                    <div className='flex w-fit gap-2'>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add_tl)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_tl_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_tl_delete ? actionList.delete_tl_cancel : actionList.select_tl_delete)} />
                        </div>
                    </div>
                </div>

                {/* Bảng hiển thị thể loại */}
                <div className='w-full bg-[#141414]'>
                    <div className='grid grid-cols-8 w-full items-center pt-3 pb-3 border-b border-[#A4A298] text-[#A4A298]'>
                        <div className='text-center'>Mã</div>
                        <div className='col-span-3 text-center'>Tên thể loại</div>
                        <div className='col-span-2 text-center'>Ngày tạo</div>
                        <div className='col-span-2 text-center'>Số lượng bài hát</div>
                    </div>
                    <div id="wrap-items-Theloai">
                        <ItemTheloai />
                    </div>
                </div>
            </div>

            {/* Hiển thị modal hoặc nội dung khác dựa trên valueAction */}
            {stateBgCover && (
                <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                    {
                        (() => {
                            switch (valueAction) {

                                case actionList.add_tl:
                                    return <FormAddTL />

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


