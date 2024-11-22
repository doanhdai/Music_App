import React, { useContext, useEffect, useReducer, useState, useRef } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from 'react-icons/io';
import { Button, message, Upload, Modal } from 'antd';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

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
    const { isGettingAdvertisementsData, isGettingAdvertisersData, uploadImage, openNotification, url, advertisersData, advertisementsData, formatDate, setAdvertisers, setAdvertisements, contractsData } = useContext(AdminContext);
    const [keySelected, setKeySelected] = useState("");
    const [valueAction, setValueAction] = useState("");
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // Lưu file đã chọn
    const [valueUpdate, setValueUpdate] = useState("");
    const [valueSearchNQC, setValueSearchNQC] = useState("");
    const [filterNQC, setFilterNQC] = useState([]);
    const [valueSearchQC, setValueSearchQC] = useState({ input: '', select: '1' });
    const [filterQC, setFilterQC] = useState([]);

    useEffect(() => {
        setBgCover(stateBgCover);
    }, [stateBgCover, setBgCover]);


    useEffect(() => {
        if (valueAction == actionList.select_qc_update) {
            message.info('Nhấp chuột vào quảng cáo cần sửa!');
        } else if (valueAction == actionList.update_qc_cancel) {
            message.info('Thoát khỏi chế độ chỉnh sửa quảng cáo!');
        } else if (valueAction == actionList.select_qc_delete) {
            message.info('Bạn đang ở chế độ xóa quảng cáo.\nNhấp chuột vào quảng cáo cần xóa!');
        } else if (valueAction == actionList.delete_qc_cancel) {
            message.info('Thoát khỏi chế độ xóa quảng cáo!');
        } else if (valueAction == actionList.select_nqc_delete) {
            message.info('Bạn đang ở chế độ xóa nhà đăng kí quảng cáo.\nNhấp chuột vào nhà đăng kí quảng cáo cần xóa!');
        } else if (valueAction == actionList.delete_nqc_cancel) {
            message.info('Thoát khỏi chế độ xóa nhà đăng kí quảng cáo!');
        }

    }, [valueAction]);

    const handleAction = (action) => {
        setValueAction(action);
        dispatchBgCover({ type: action });
    };

    const handleBeforeUpload = (file) => {
        setSelectedFile(file); // Lưu file vào state
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageUrl(fileReader.result); // Hiển thị preview
        };
        fileReader.readAsDataURL(file);
        return false; // Ngăn upload tự động
    };

    const ImageUpload = () => {
        return (
            <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleBeforeUpload} // Chỉ lưu file vào state, không upload
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : (
                    <div>
                        <CiCirclePlus />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>

        )
    }

    const callAPI_DeleteNQC = async (ma_nqc) => {
        try {
            const response = await axios.delete(`${url}/api/advertisers/${ma_nqc}`);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNQC = (ma_nqc) => {

        Modal.confirm({
            title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            content: 'Xóa nhà đăng kí quảng cáo ' + ma_nqc,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                setAdvertisers((prev) => prev.filter(item => item.ma_nqc !== ma_nqc))
                openNotification("Xóa nhà đăng kí quảng cáo");
                setValueAction(actionList.delete_nqc_cancel);
                callAPI_DeleteNQC(ma_nqc);
            },
            onCancel() {
                setValueAction(actionList.delete_nqc_cancel);
            },
        });



    }


    const callAPI_DeleteQC = async (ma_quang_cao) => {
        try {
            const response = await axios.delete(`${url}/api/advertisements/${ma_quang_cao}`);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteQC = (ma_quang_cao) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            content: 'Xóa quảng cáo ' + ma_quang_cao,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                setAdvertisements((prev) => prev.filter(item => item.ma_quang_cao !== ma_quang_cao));
                openNotification("Xóa quảng cáo");
                setValueAction(actionList.delete_qc_cancel);
                callAPI_DeleteQC(ma_quang_cao);
            },
            onCancel() {
                setValueAction(actionList.delete_qc_cancel);
            },
        });

    };

    function FormAddNQC() {
        return (
            <form onSubmit={addNQC} className="bg-[#1E1E1E] w-auto p-4">
                <p className='text-[#A4A298]'>Nhập tên nhà đăng kí quảng cáo</p>
                <input
                    className="p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                    name="ten"
                />


                <p className='text-[#A4A298]'>Nhập số điện thoại</p>
                <input
                    className="p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                    name="sdt"
                />

                <div className="flex justify-center mt-4 gap-2">
                    <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => { handleAction(actionList.add_nqc_cancel); }}>Hủy</button>
                    <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' type="submit">Xác nhận</button>
                </div>
            </form>
        );
    }
    function FormAddQC() {


        return (
            <form onSubmit={addQC} className="bg-[#1E1E1E] w-fit p-4 flex gap-3 items-center">
                {
                    valueAction != actionList.update_qc && <ImageUpload />
                }
                <div>
                    <div className='flex gap-3 my-4'>
                        <p className='text-[#A4A298]'>Chọn nhà đăng kí</p>
                        <select className='bg-[#EB2272] text-white rounded-md border-none w-auto outline-none cursor-pointer text-center' name="ma_nqc">
                            {
                                advertisersData.map((item) => <option value={item.ma_nqc} className='bg-[#EB2272] text-white'>{item.ten_nqc}</option>)
                            }
                        </select>
                    </div>
                    <p className='text-[#A4A298]'>Nhập tên quảng cáo</p>
                    <input
                        className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                        type="text"
                        name="ten"
                    />
                    <p className='text-[#EB2272] italic'></p>
                    <div className="flex justify-center mt-4 gap-2">
                        <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => { setSelectedFile(null); setImageUrl(null); handleAction(actionList.add_nqc_cancel) }}>Hủy</button>
                        <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' type='submit'>Xác nhận</button>
                    </div>
                </div>




            </form>
        );
    }

    const callAPI_AddNQC = async (ten, sdt) => {
        try {
            const response = await axios.post(`${url}/api/advertisers`, {
                ten_nqc: ten,
                so_dien_thoai: sdt
            });
            setAdvertisers((prev) => [...prev, { ma_nqc: response.data.ma_nqc, ten_nqc: ten, so_dien_thoai: sdt }]);

        } catch (err) {
            console.error(err);
        }
    };


    const addNQC = (e) => {
        e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }
        const sdtRegex = /^0[0-9]{9}$/;


        if (!formData.ten.trim()) {
            message.error("Tên không được để trống");

        }
        if (!formData.sdt.trim()) {
            message.error("Số điện thoại không được để trống");
            return;
        } else if (!sdtRegex.test(formData.sdt)) {
            message.error("Số điện thoại bắt đầu là số 0.\nTheo sau là 9 chữ số.");
            return;
        }

        openNotification("Tạo nhà đăng ký quảng cáo");
        callAPI_AddNQC(formData.ten, formData.sdt);
        handleAction("");


    };

    const callAPI_AddQC = async (ten, hinhanh, nqc) => {
        try {
            const response = await axios.post(`${url}/api/advertisements`, {
                ten_quang_cao: ten,
                hinh_anh: hinhanh,
                ma_nqc: nqc
            });
            nqc = advertisersData.find((item) => item.ma_nqc == nqc);
            setAdvertisements((prev) => [...prev, { ma_quang_cao: response.data.ma_quang_cao, ten_quang_cao: ten, ngay_tao: response.data.ngay_tao, hinh_anh: hinhanh, trang_thai: 1, ma_nqc: nqc, ten_nqc: nqc.ten_nqc }]);

        } catch (err) {
            console.error(err);
        }
    };

    const addQC = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            message.error("Vui lòng chọn một file trước!");
            return;
        }

        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }

        if (!formData.ten.trim()) {
            message.error("Tên không được để trống");
            return;
        }

        const formImage = new FormData();
        formImage.append('image', selectedFile);
        const link = await uploadImage(formImage);

        callAPI_AddQC(formData.ten, link, formData.ma_nqc);
        openNotification("Tạo quảng cáo");
        setSelectedFile(null);
        setImageUrl(null);
        handleAction("");


    }


    const callAPI_UpdateQC = async (ma_quang_cao) => {
        try {
            const response = await axios.put(`${url}/api/advertisements`, {
                ma_quang_cao: ma_quang_cao,
                ten_quang_cao: valueUpdate
            });
        } catch (err) {
            console.log("loi sua quang cao");
            console.error(err);
        }
    };

    const updateQC = (e) => {
        e.preventDefault();
        if (valueUpdate != '') {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
                content: 'Cập nhật quảng cáo ' + keySelected,
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                    setAdvertisements((prev) => prev.map((item) => {
                        if (item.ma_quang_cao == keySelected) return { ...item, ten_quang_cao: valueUpdate }
                        else return { ...item }
                    }));
                    openNotification("Cập nhật quảng cáo");
                    handleAction(actionList.update_qc_cancel);
                    callAPI_UpdateQC(keySelected);

                },
                onCancel() {
                    handleAction(actionList.update_qc_cancel);
                },
            });
        } else {
            message.error("Tên quảng cáo không để trống");
        }


    }



    function FormUpdateQC() {
        const quangcao = advertisementsData.find((item) => item.ma_quang_cao == keySelected);
        return (
            <form onSubmit={updateQC} className="bg-[#1E1E1E] w-fit p-4 flex">
                <div>
                    <p className='text-[#A4A298]'>Nhập tên quảng cáo</p>
                    <input
                        className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                        type="text"
                        placeholder={quangcao.ten_quang_cao}
                        value={valueUpdate}
                        onChange={(e) => setValueUpdate(e.target.value)}
                        autoFocus
                    />
                    <p className='text-[#EB2272] italic'></p>
                    <div className="flex justify-center mt-4 gap-2">
                        <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction(actionList.update_qc_cancel)}>Hủy</button>
                        <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' type='submit'>Xác nhận</button>
                    </div>
                </div>




            </form>
        );
    }

    useEffect(() => {
        const lowerSearch = valueSearchNQC.trim().toLowerCase();
        if (lowerSearch !== '') {
            // Lọc dữ liệu thay vì map
            const filteredData = advertisersData.filter((item) => {
                return (item.ten_nqc.toLowerCase().includes(lowerSearch) || item.so_dien_thoai.includes(lowerSearch));
            });
            setFilterNQC(filteredData);
        } else {
            // Nếu không có từ khóa tìm kiếm, trả lại toàn bộ dữ liệu
            setFilterNQC(advertisersData);
        }
    }, [valueSearchNQC]); // Thêm advertisersData để tránh lỗi khi dữ liệu thay đổi

    const searchNQC = (e) => {
        e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }
        setValueSearchNQC(formData.search);

    }

    useEffect(() => {
        const lowerInput = valueSearchQC.input.trim().toLowerCase(); // Điều kiện tìm kiếm từ input
        const ma_nqc = valueSearchQC.select; // Điều kiện tìm kiếm từ select

        let filteredData = [];

        // Lọc theo input (nếu input không trống)
        if (lowerInput !== '') {
            filteredData = advertisementsData.filter((item) => {
                return item.ten_quang_cao.toLowerCase().includes(lowerInput); // Lọc theo ten_quang_cao
            });
        } else {
            filteredData = advertisementsData; // Nếu input trống, không lọc gì cả
        }

        // Lọc theo ma_nqc (nếu ma_nqc khác '1')
        if (ma_nqc !== '1') {
            filteredData = filteredData.filter((item) => {
                return item.ma_nqc.toLowerCase().includes(ma_nqc.toLowerCase()); // Lọc theo ma_nqc
            });
        }

        setFilterQC(filteredData); // Cập nhật dữ liệu lọc
    }, [valueSearchQC, advertisementsData]); // Thêm advertisementsData vào dependency array để đảm bảo dữ liệu được cập nhật khi thay đổi


    const searchQC = (e) => {
        e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }
        setValueSearchQC({ input: formData.input, select: formData.select });

    }

    function ItemNhaDangKy({ list }) {
        let array = list;
        return array.map((item) => (
            <div key={item.ma_nqc}
                className={`grid grid-cols-7 items-center pt-2 pb-2 ${valueAction == actionList.select_nqc_delete && 'hover:!bg-[#EB2272] cursor-pointer'}`}
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

                <div className='col-span-2 text-center'>{item.ma_nqc}</div>
                <div className='col-span-3 text-center'>{item.ten_nqc}</div>
                <div className='col-span-2 text-center'>{item.so_dien_thoai}</div>
            </div>
        ));
    }

    function ItemQuangCao({ list }) {
        let array1 = list;
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
                <img src={quangcao.hinh_anh == null ? 'https://www.shutterstock.com/image-vector/empty-set-null-slashed-zero-260nw-2297368031.jpg' : quangcao.hinh_anh} className='w-full h-auto' />
                <h2 className='font-bold text-lg'>{quangcao.ten_quang_cao}</h2>
                <div className='text-base text-[#A4A298]'>{quangcao.ten_nqc}</div>
                <h5 className='text-sm text-[#A4A298]'>Ngày tạo: {formatDate(quangcao.ngay_tao)}</h5>
                <div className='absolute bg-[#EB2272] top-0 left-0 p-2 text-black font-bold'>{quangcao.ma_quang_cao}</div>
            </div>
        ));
    }


    return (
        <div className="grid grid-cols-5 h-auto">
            {/* Phần giao diện cho nhà đăng ký */}
            {isGettingAdvertisersData ? (<div className="wrap-loader"><span className="loader"></span></div>) :
                (
                    <>

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
                            {
                                advertisersData.length == 0 ? (<div className="w-full text-center">Chưa có nhà quảng cáo</div>) : (
                                    <>

                                        <form onSubmit={searchNQC} className='flex w-full h-[40px] items-center mt-6 mb-6'>
                                            <div className="flex items-center p-2.5 w-[50%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                                                <IoIosSearch className="text-white text-2xl cursor-pointer" />
                                                <input
                                                    className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                                                    type="text"
                                                    name='search'
                                                    placeholder="Tên hoặc số điện thoại"
                                                />
                                            </div>
                                            <Button type="submit" htmlType="submit" className="rounded-full bg-[#E0066F] h-[80%] w-[25%] hover:!bg-[#E0066F] text-sm ml-4 font-normal">
                                                Tìm kiếm
                                            </Button>
                                        </form>

                                        <div className='w-full bg-[#141414]'>
                                            <div className='grid  grid-cols-7 w-full items-center pt-3 pb-3 border-b border-[#A4A298] text-[#A4A298]'>
                                                <div className='col-span-2 text-center'>Mã</div>
                                                <div className='col-span-3 text-center'>Tên</div>
                                                <div className='col-span-2 text-center'>Số điện thoại</div>
                                            </div>
                                            <div className='h-[45vh] overflow-y-auto'>
                                                <ItemNhaDangKy list={valueSearchNQC == '' ? advertisersData : filterNQC} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }


                        </div>



                    </>
                )
            }


            {/* Phần giao diện cho quảng cáo */}
            {isGettingAdvertisementsData ? (<div className="wrap-loader"><span className="loader"></span></div>) :
                (
                    <>

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
                            {
                                advertisementsData.length == 0 ? (<div className="w-full text-center">Chưa có quảng cáo</div>) : (
                                    <>
                                        <form onSubmit={searchQC} className='flex w-full h-[40px] items-center mt-6 mb-6'>
                                            <div className="flex items-center p-2.5 w-[25%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                                                <IoIosSearch className="text-white text-2xl cursor-pointer" />
                                                <input
                                                    className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                                                    type="text"
                                                    name="input"
                                                    placeholder="Tên quảng cáo"
                                                />
                                            </div>
                                            <select name="select" className="bg-[#1E1E1E] text-white rounded-md border-none w-auto outline-none cursor-pointer ml-4 mr-4 text-center pt-1 pb-1 pr-1 text-sm">
                                                <option className="bg-[#1E1E1E] text-white" key={1} value={1}>Tất cả</option>
                                                {

                                                    advertisersData.map((item) => (
                                                        <option className="bg-[#1E1E1E] text-white" key={item.ma_nqc} value={item.ma_nqc}>
                                                            {item.ten_nqc}
                                                        </option>
                                                    )
                                                    )
                                                }
                                            </select>
                                            <Button type="submit" htmlType="submit" className="rounded-full bg-[#E0066F] h-[80%] w-[20%] hover:!bg-[#E0066F] text-sm font-normal">
                                                Tìm kiếm
                                            </Button>
                                        </form>

                                        <div className='w-full h-[53vh] grid grid-cols-3 gap-2 overflow-y-auto'>
                                            <ItemQuangCao list={JSON.stringify(valueSearchQC) === JSON.stringify({ input: '', select: '1' }) ? advertisementsData : filterQC} />
                                        </div>
                                    </>
                                )
                            }


                        </div>


                    </>
                )
            }





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


