import { IoIosSearch } from 'react-icons/io'
import { Button, message, Modal } from 'antd'
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';




function ContractPage() {
    const { openNotification, url, advertisementsData, formatDate, contractsData, setContract } = useContext(AdminContext);
    const [isAdding, setIsAdding] = useState(false);
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [keySelected, setKeySelected] = useState("");
    const [valueSearchQC, setValueSearchQC] = useState("");
    const [filterQC, setFilterQC] = useState([]);
    const [valueSearchHopdong, setValueSearchHopdong] = useState({ input: '', select: '1' });
    const [filterHopdong, setFilterHopdong] = useState([]);
    // const [hopdongList, setHopdongList] = useState(adsContractData);

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setImage(e.target.result); // Set the uploaded image URL
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // useEffect(() => {
    //     setHopdongList(adsContractData);
    // }, []);

    function ItemHopDong({ list }) {
        let array1 = list;
        return array1.map((hopdong) => (
            <div className='bg-[#1E1E1E] ' key={hopdong.ma_hop_dong}>
                <div className='flex justify-between'>
                    <div className='bg-[#E0066F] text-black p-1 font-bold'>{hopdong.ma_hop_dong}</div>
                    <div className='bg-[#E0066F] text-black p-1 '>{hopdong.ngay_thanh_toan === '' ? 'Còn thời hạn' : 'Hoàn thành'}</div>
                </div>

                <div className='p-2 flex flex-col gap-1 text-gray-400 '>
                    <img src={hopdong.hinh_anh} className='w-full h-auto' />
                    <div className='text-lg font-bold py-1 text-white '>{hopdong.ten_quang_cao}</div>
                    <div className="flex flex-row items-center  gap-2">
                        <FaHeadphones />
                        <span>{hopdong.luot_phat}</span>
                    </div>
                    <div>
                        <span>{formatDate(hopdong.ngay_hieu_luc)}</span>
                        <span className='text-base font-bold'> - </span>
                        <span>{hopdong.ngay_thanh_toan !== null ? formatDate(hopdong.ngay_thanh_toan) : '?'}</span>
                    </div>
                    <div className='text-lg'>{hopdong.doanh_thu} đ</div>
                </div>
            </div>
        ))


    }

    useEffect(() => {
        console.log(valueSearchHopdong);
        const lowerInput = valueSearchHopdong.input.trim().toLowerCase(); // Điều kiện tìm kiếm từ input
        const done = valueSearchHopdong.select; // Điều kiện tìm kiếm từ select

        let filteredData = [];

        // Lọc theo input (nếu input không trống)
        if (lowerInput !== '') {
            filteredData = contractsData.filter((item) => {
                return item.ten_quang_cao.toLowerCase().includes(lowerInput); // Lọc theo ten_quang_cao
            });
        } else {
            filteredData = contractsData; // Nếu input trống, không lọc gì cả
        }


        // Lọc theo ma_nqc (nếu ma_nqc khác '1')
        if (done !== 1) {
            if (done == 2)
                filteredData = filteredData.filter((item) => {
                    return item.ngay_thanh_toan != null // Lọc theo ma_nqc
                });
            if (done == 3)
                filteredData = filteredData.filter((item) => {
                    return item.ngay_thanh_toan == null // Lọc theo ma_nqc
                });
        }

        setFilterHopdong(filteredData); // Cập nhật dữ liệu lọc
    }, [valueSearchHopdong, contractsData]); // Thêm advertisementsData vào dependency array để đảm bảo dữ liệu được cập nhật khi thay đổi


    const searchHopdong = (e) => {
        e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }
        setValueSearchHopdong({ input: formData.input, select: formData.select });

    }

    useEffect(() => {
        const lowerInput = valueSearchQC.trim().toLowerCase(); // Điều kiện tìm kiếm từ input


        let filteredData = [];

        // Lọc theo input (nếu input không trống)
        if (lowerInput !== '') {
            filteredData = advertisementsData.filter((item) => {
                return item.ten_quang_cao.toLowerCase().includes(lowerInput); // Lọc theo ten_quang_cao
            });
        } else {
            filteredData = advertisementsData; // Nếu input trống, không lọc gì cả
        }
        setFilterQC(filteredData); // Cập nhật dữ liệu lọc
    }, [valueSearchQC]); // Thêm advertisementsData vào dependency array để đảm bảo dữ liệu được cập nhật khi thay đổi


    const callAPI_AddHopdong = (ma_quang_cao, luot_phat, doanh_thu, ngay_hieu_luc) => {
        try {
            // const response = await axios.post(`${url}/api/advertising-contracts`, {
            //     ma_quang_cao: ma_quang_cao,
            //     luot_phat: luot_phat,
            //     doanh_thu: doanh_thu,
            //     ngay_hieu_luc: ngay_hieu_luc,
            //     ngay_thanh_toan: ""
            // });
            let qc = advertisementsData.find((item) => item.ma_quang_cao == ma_quang_cao);
            setContract((prev) => [...prev, {
                ma_hop_dong: 'HD003', //response.data.ma_hop_dong,
                ma_quang_cao: ma_quang_cao,
                ten_quang_cao: qc.ten_quang_cao,
                luot_phat: luot_phat,
                doanh_thu: doanh_thu,
                ngay_hieu_luc: ngay_hieu_luc,
                hinh_anh: qc.hinh_anh,
                ngay_thanh_toan: null
            }]);

        } catch (err) {
            console.error(err);
        }
    };

    const addHopdong = (e) => {
        e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.name) {
                formData[element.name] = element.value; // Lưu giá trị theo `name`
            }
        }

        let error = false;
        if (keySelected == "") {
            message.error("Chưa chọn quảng cáo");
            error = true;
        }
        if (formData.luot_phat == "") {
            message.error("Chưa nhập số lượt phát quảng cáo");
            error = true;
        }
        if (formData.doanh_thu == "") {
            message.error("Chưa nhập doanh thu của hợp đồng");
            error = true;
        }

        if (!error) {
            Modal.confirm({
                title: 'Xác nhận?',
                content: 'Thêm hợp đồng quảng cáo ',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                    openNotification("Thêm hợp đồng quảng cáo");
                    // setContract((prev)=>[...prev, {}])
                    // setValueAction(actionList.delete_nqc_cancel);
                    callAPI_AddHopdong(keySelected, formData.luot_phat, formData.doanh_thu, formData.ngay_hieu_luc + " 00:00:00");

                    setIsAdding(false);
                    setBgCover(false);
                    setKeySelected("");
                },
                onCancel() {
                    setIsAdding(false);
                    setBgCover(false);
                    setKeySelected("");
                },
            });
        }
    }

    function FormAdd() {
        const quangcao = advertisementsData.find((item) => item.ma_quang_cao == keySelected);
        const today = new Date().toISOString().split('T')[0];
        return (
            <div className=' flex bg-[#1E1E1E]'>
                <div className='w-[25vw]  p-2  border-r '>
                    <div>
                        <form className='flex gap-2 h-[40px] items-center mb-2'>
                            <div className='flex items-center p-2 w-[80%] bg-black justify-between rounded-3xl'>
                                <IoIosSearch className="text-white text-2xl cursor-pointer " />
                                <input
                                    className="bg-black w-[100%] outline-none ml-3 text-white"
                                    type="text"
                                    name='search'
                                    placeholder="Tên quảng cáo"
                                    value={valueSearchQC}
                                    onChange={(e) => setValueSearchQC(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </form>
                    </div>
                    <div className='w-full h-[40vh] overflow-y-auto'>
                        {
                            (valueSearchQC == '' ? advertisementsData : filterQC).map((item) =>
                                <div key={item.ma_quang_cao} className='grid grid-cols-5 w-fit my-3 items-center'>
                                    <div className=' text-left'>{item.ma_quang_cao}</div>
                                    <div style={{ maxHeight: '1.5em' }} className='overflow-hidden  col-span-3'>{item.ten_quang_cao}</div>
                                    <Button type="primary" className='rounded-3xl bg-[#E0066F] h-hull w-fit hover:!bg-[#E0066F] '
                                        onClick={() => setKeySelected(item.ma_quang_cao)}
                                    >
                                        Chọn
                                    </Button>
                                </div>)
                        }
                    </div>
                    <form>

                    </form>
                </div>
                <div className='flex gap-2 p-2 items-center w-[40vw]'>
                    <div className=" rounded-lg  mr-5 max-w-sm  ">
                        <div
                            id="image-preview"
                            className=" bg-white aspect-square w-40   border-2  rounded-lg "
                        >
                            {quangcao && (
                                <img
                                    src={quangcao.hinh_anh}
                                    alt="Uploaded"
                                    className="aspect-square object-cover rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                    <form onSubmit={addHopdong}>
                        <p style={{ maxHeight: '1.5em' }} className='text-xl  font-bold mb-2 overflow-y-scroll '>{quangcao ? quangcao.ten_quang_cao : 'Chưa chọn quảng cáo'}</p>
                        <p className='text-[#A4A298]'>Nhập số lượt phát</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                            type="number"
                            name="luot_phat"
                            min={10}
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <p className='text-[#A4A298]'>Nhập giá hợp đồng</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                            type="number"
                            name="doanh_thu"
                            min={100000}
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <p className='text-[#A4A298]'>Chọn ngày hợp đồng có hiệu lực</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                            type="date"
                            name='ngay_hieu_luc'
                            defaultValue={today} // Giá trị mặc định là ngày hiện tại
                            min={today} // Giới hạn tối đa là ngày hiện tại
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <div className="flex justify-center my-3 gap-2">
                            <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => {

                                setIsAdding(false);
                                setBgCover(false);
                                setKeySelected("");
                            }}>Hủy</button>
                            <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' type='submit'>Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='flex justify-between'>
                <form onSubmit={searchHopdong} className='flex items-center space-x-5'>
                    {/* Search Box */}


                    <div className='flex flex-col'>
                        <label className='mb-2 text-[#A4A298]'>Tìm hợp đồng theo</label>

                        <div className='flex items-center p-2 w-[300px] bg-[#1E1E1E] justify-between rounded-3xl'>
                            <IoIosSearch className="text-white text-2xl cursor-pointer" />
                            <input
                                className="bg-[#1E1E1E] w-[100%] outline-none ml-3 text-white"
                                type="text"
                                placeholder="Tên quảng cáo"
                                name="input"
                            />
                        </div>
                    </div>

                    {/* User Type Filter */}

                    <div className='flex flex-col'>
                        <label className="mb-2 text-[#A4A298]">Loại</label>
                        <select name='select' className='bg-[#1E1E1E] text-white p-2 rounded-3xl border-none w-[150px] outline-none cursor-pointer'>
                            <option value={1}>Tất cả</option>
                            <option value={2}>Hoàn thành</option>
                            <option value={3}>Còn quảng cáo</option>
                        </select>
                    </div>


                    {/* Search Button */}
                    <div className='flex flex-col'>
                        <label className='mb-1'>&nbsp;</label> {/* Dùng label rỗng để giữ chiều cao tương tự */}
                        <Button type="submit" htmlType="submit" className='rounded-3xl bg-[#E0066F] h-[35px] w-[100px] hover:!bg-[#E0066F]'>
                            Tìm kiếm
                        </Button>
                    </div>
                </form>
                <div className='flex flex-col'>
                    <label className='mb-1'>&nbsp;</label>
                    <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer'>
                        <CiCirclePlus size={25} onClick={() => {
                            setIsAdding(!isAdding);
                            setBgCover(true);
                        }} />
                    </div>


                </div>
            </div>
            <label className='mt-6 mb-3 block'>Tổng cộng: {contractsData.length} hợp đồng</label>
            <div className='grid grid-cols-5 gap-2 w-full h-[50vh] overflow-y-auto'>
                <ItemHopDong list={JSON.stringify(valueSearchHopdong) === JSON.stringify({ input: '', select: '1' }) ? contractsData : filterHopdong} />

            </div>
            {
                isAdding && (
                    <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                        <FormAdd />
                    </div>
                )
            }
        </>
    )
}

export default ContractPage;