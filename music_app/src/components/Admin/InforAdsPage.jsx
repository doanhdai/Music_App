import React, { useContext, useEffect, useReducer, useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from 'react-icons/io';
import { Button } from 'antd';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import ImageUpload from "../../pages/artist/components/ImageUpload";
import { PlayerContext } from "../../context/PlayerContext";

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

// let hopdongList = [
//     { ma_hop_dong: 1, ma_quang_cao: 1, luot_phat: 211, doanh_thu: 10000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
//     { ma_hop_dong: 2, ma_quang_cao: 2, luot_phat: 231, doanh_thu: 10440000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
//     { ma_hop_dong: 3, ma_quang_cao: 3, luot_phat: 111, doanh_thu: 4500000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
//     { ma_hop_dong: 4, ma_quang_cao: 4, luot_phat: 209, doanh_thu: 9000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
//     { ma_hop_dong: 5, ma_quang_cao: 1, luot_phat: 230, doanh_thu: 10500000, ngay_tao: '23/12/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
//     { ma_hop_dong: 6, ma_quang_cao: 3, luot_phat: 146, doanh_thu: 5400000, ngay_tao: '23/11/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
//     { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '09/09/2023 18:00:33', ngay_hoan_thanh: '' },
// ]

const actionList = {
    add_nqc: "ADD_CL",
    delete_nqc: "DELETE_CL",
    add_qc: "ADD_TL",
    update_qc: "UPDATE_TL",
    delete_qc: "DELETE_TL",
    add_nqc_cancel: "ADD_NQC_CANCEL",
    delete_nqc_cancel: "DELETE_NQC_CANCEL",
    add_qc_cancel: "ADD_QC_CANCEL",
    update_qc_cancel: "UPDATE_QC_CANCEL",
    delete_qc_cancel: "DELETE_QC_CANCEL",
    select_nqc_delete: 'SELECT_NQC_DELETE',
    select_qc_update: 'SELECT_QC_UPDATE',
    select_qc_delete: 'SELECT_QC_DELETE'
};

function reducerBgCover(state, action) {
    switch (action.type) {
        case actionList.add_nqc:
        case actionList.add_qc:
        case actionList.update_qc:
            return true;
        default:
            return false;
    }
}

const InforAdsPage = () => {
    const { adsContractData } = useContext(PlayerContext);
    const [keySelected, setKeySelected] = useState("");
    const [valueAction, setValueAction] = useState("");
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);
    const [hopdongList, setHopdongList] = useState([]);

    useEffect(() => {
        setHopdongList(adsContractData);
    }, [adsContractData]);

    useEffect(() => {
        setBgCover(stateBgCover);
    }, [stateBgCover, setBgCover]);

    useEffect(() => {
        if (valueAction == actionList.select_qc_update) {
            alert('Nhấp chuột vào quảng cáo cần sửa!');
        } else if (valueAction == actionList.update_qc_cancel) {
            alert('Thoát khỏi chế độ chỉnh sửa quảng cáo!');
        } else if (valueAction == actionList.select_qc_delete) {
            alert('Bạn đang ở chế độ xóa quảng cáo.\nNhấp chuột vào quảng cáo cần xóa!');
        } else if (valueAction == actionList.delete_qc_cancel) {
            alert('Thoát khỏi chế độ xóa quảng cáo!');
        } else if (valueAction == actionList.select_nqc_delete) {
            alert('Bạn đang ở chế độ xóa nhà đăng kí quảng cáo.\nNhấp chuột vào nhà đăng kí quảng cáo cần xóa!');
        } else if (valueAction == actionList.delete_nqc_cancel) {
            alert('Thoát khỏi chế độ xóa nhà đăng kí quảng cáo!');
        }

    }, [valueAction]);

    const handleAction = (action) => {
        setValueAction(action);
        dispatchBgCover({ type: action });
    };
    const deleteNQC = (ma_nqc) => {
        const quangcao = quangcaoList.find((item) => item.ma_nqc == ma_nqc);
        if (!quangcao) {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?");
            if (isConfirmed) {
                nhadangkyList = nhadangkyList.filter(item => item.ma_nqc !== ma_nqc);
                alert(`Đã xóa nhà đăng ký quảng cáo có mã: ${ma_nqc}`);
            } else {

            }
            setValueAction(actionList.delete_nqc_cancel);
        } else {
            alert(`Không thể xóa nhà đăng ký quảng cáo có mã: ${ma_nqc}.\nDo nhà đăng ký này đã đăng kí quảng cáo`);
        }

    }

    const deleteQC = (ma_quang_cao) => {
        const hopdong = hopdongList.find((item) => item.ma_quang_cao == ma_quang_cao);
        if (!hopdong) {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn thực hiện hành động này?");
            if (isConfirmed) {
                quangcaoList = quangcaoList.filter(item => item.ma_quang_cao !== ma_quang_cao);
                alert(`Đã xóa chủng loại có mã: ${ma_quang_cao}`);
            } else {

            }
            setValueAction(actionList.delete_qc_cancel);
        } else {
            alert(`Không thể xóa quảng cáo có mã: ${ma_quang_cao}.\nDo quảng cáo đã thuộc một hợp đồng nào đó`);
        }

    };

    function FormAddNQC() {
        return (
            <form className="bg-[#1E1E1E] w-auto p-4">
                <p className='text-[#A4A298]'>Nhập tên nhà đăng kí quảng cáo</p>
                <input
                    className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                />
                <p className='text-[#EB2272] italic'></p>

                <p className='text-[#A4A298]'>Nhập số điện thoại</p>
                <input
                    className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                />
                <p className='text-[#EB2272] italic'></p>
                <div className="flex justify-center mt-4 gap-2">
                    <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(actionList.add_nqc_cancel)}>Hủy</button>
                    <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>
                </div>
            </form>
        );
    }
    function FormAddQC() {


        return (
            <form className="bg-[#1E1E1E] w-fit p-4 flex">
                {
                    valueAction != actionList.update_qc && <ImageUpload />
                }
                <div>
                    <div className='flex gap-3 my-4'>
                        <p className='text-[#A4A298]'>Chọn nhà đăng kí</p>
                        <select className='bg-[#EB2272] text-white rounded-md border-none w-auto outline-none cursor-pointer text-center'>
                            {
                                nhadangkyList.map((item) => <option className='bg-[#EB2272] text-white'>{item.ten_nqc}</option>)
                            }
                        </select>
                    </div>
                    <p className='text-[#A4A298]'>Nhập tên quảng cáo</p>
                    <input
                        className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                        type="text"
                    />
                    <p className='text-[#EB2272] italic'></p>
                    <div className="flex justify-center mt-4 gap-2">
                        <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(actionList.add_nqc_cancel)}>Hủy</button>
                        <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>
                    </div>
                </div>




            </form>
        );
    }

    function FormUpdateQC() {
        const quangcao = quangcaoList.find((item) => item.ma_quang_cao == keySelected);
        return (
            <form className="bg-[#1E1E1E] w-fit p-4 flex">
                <div>
                    <div className='flex gap-3 my-4'>
                        <p className='text-[#A4A298]'>Chọn nhà đăng kí</p>
                        <select className='bg-[#EB2272] text-white rounded-md border-none w-auto outline-none cursor-pointer text-center'>
                            {
                                nhadangkyList.map((item) => <option selected={item.ma_nqc == quangcao.ma_nqc} className='bg-[#EB2272] text-white'>{item.ten_nqc}</option>)
                            }
                        </select>
                    </div>
                    <p className='text-[#A4A298]'>Nhập tên quảng cáo</p>
                    <input
                        className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                        type="text"
                        placeholder={quangcao.ten_quang_cao}
                    />
                    <p className='text-[#EB2272] italic'></p>
                    <div className="flex justify-center mt-4 gap-2">
                        <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(actionList.update_qc_cancel)}>Hủy</button>
                        <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>
                    </div>
                </div>




            </form>
        );
    }

    function ItemNhaDangKy() {
        let array = nhadangkyList;
        return array.map((item) => (
            <div key={item.ma_nqc}
                className={`grid grid-cols-6 w-full items-center pt-2 pb-2 ${valueAction == actionList.select_nqc_delete && 'hover:!bg-[#EB2272] cursor-pointer'}`}
                onClick={() => {
                    setKeySelected(item.ma_nqc);
                    switch (valueAction) {
                        case actionList.select_nqc_delete:
                            deleteNQC(item.ma_nqc);
                            break;
                        default:
                            break;
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
                className={`w-full bg-[#141414] h-auto relative p-2 flex flex-col gap-2 ${(valueAction == actionList.select_qc_update || valueAction == actionList.select_qc_delete) && 'hover:!bg-[#EB2272] cursor-pointer'} `}
                onClick={() => {
                    setKeySelected(quangcao.ma_quang_cao);
                    switch (valueAction) {
                        case actionList.select_qc_update: handleAction(actionList.update_qc); break;
                        case actionList.select_qc_delete: deleteQC(quangcao.ma_quang_cao); break;
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
                    <div className='flex w-fit gap-2'>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add_nqc)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_nqc_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_nqc_delete ? actionList.delete_nqc_cancel : actionList.select_nqc_delete)} />
                        </div>
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
                    <div className='flex w-fit gap-2 '>
                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add_qc)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_qc_update ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdOutlineEdit size={25} onClick={() => handleAction(valueAction == actionList.select_qc_update ? actionList.update_qc_cancel : actionList.select_qc_update)} />
                        </div>
                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_qc_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_qc_delete ? actionList.delete_qc_cancel : actionList.select_qc_delete)} />
                        </div>
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
                                case actionList.add_nqc:
                                    return <FormAddNQC />
                                case actionList.add_qc:
                                    return <FormAddQC />
                                case actionList.update_qc:
                                    if (keySelected != "")
                                        return <FormUpdateQC />
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
export default InforAdsPage;


