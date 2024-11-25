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


const todayNewDate = new Date();
const today = todayNewDate.toISOString().split('T')[0];
const tomorrowNewDate = new Date();
tomorrowNewDate.setDate(todayNewDate.getDate() + 1); // Thêm 1 ngày
const tomorrow = tomorrowNewDate.toISOString().split('T')[0];

function ContractPage() {
    const { isGettingContractsData, openNotification, url, advertisementsData, formatDate, contractsData, setContract } = useContext(AdminContext);
    const [isAdding, setIsAdding] = useState(false);
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [keySelected, setKeySelected] = useState("");
    const [valueSearchQC, setValueSearchQC] = useState("");
    const [filterQC, setFilterQC] = useState([]);
    const [valueSearchHopdong, setValueSearchHopdong] = useState({ input: '', ngay_hieu_luc: today, ngay_hoan_thanh: tomorrow });
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
                    <div className='bg-[#E0066F] text-black p-1 '>{hopdong.ngay_hoan_thanh === '' ? 'Còn thời hạn' : 'Hoàn thành'}</div>
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
                        <span>{hopdong.ngay_hoan_thanh !== null ? formatDate(hopdong.ngay_hoan_thanh) : '?'}</span>
                    </div>
                    <div className='text-lg'>{hopdong.doanh_thu} đ</div>
                </div>
            </div>
        ))


    }

    useEffect(() => {
        const lowerInput = valueSearchHopdong.input.trim().toLowerCase(); // Điều kiện tìm kiếm từ input
        const ngay_hieu_luc = valueSearchHopdong.ngay_hieu_luc; // Chuỗi ngày hiệu lực (yyyy-mm-dd)
        const ngay_hoan_thanh = valueSearchHopdong.ngay_hoan_thanh; // Chuỗi ngày hoàn thành (yyyy-mm-dd)
        let filteredData = [];

        // Lọc theo input (nếu input không trống)
        if (lowerInput !== '') {
            filteredData = contractsData.filter((item) => {
                return item.ten_quang_cao.toLowerCase().includes(lowerInput); // Lọc theo ten_quang_cao
            });
        } else {
            filteredData = contractsData; // Nếu input trống, không lọc gì cả
        }

        // Lọc theo ngày hiệu lực
        if (ngay_hieu_luc) { // Kiểm tra nếu có giá trị ngày hiệu lực
            filteredData = filteredData.filter((item) => {
                const currentDate = item.ngay_hieu_luc.split(' ')[0]; // Chỉ lấy phần yyyy-mm-dd
                return currentDate === ngay_hieu_luc; // So sánh chuỗi ngày
            });
        }

        // Lọc theo ngày hoàn thành
        if (ngay_hoan_thanh) { // Kiểm tra nếu có giá trị ngày hoàn thành
            filteredData = filteredData.filter((item) => {
                const currentDate = item.ngay_hoan_thanh.split(' ')[0]; // Chỉ lấy phần yyyy-mm-dd
                return currentDate === ngay_hoan_thanh; // So sánh chuỗi ngày
            });
        }

        setFilterHopdong(filteredData); // Cập nhật dữ liệu lọc
    }, [valueSearchHopdong, contractsData]); // Thêm advertisementsData vào dependency array để đảm bảo dữ liệu được cập nhật khi thay đổi


    const searchHopdong = (e) => {

        if ((e.target).elements != undefined)
            e.preventDefault();
        const formData = {};
        const elements = (e.target).elements; // Lấy danh sách các phần tử trong form
        let error = false;
        if (elements != undefined) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];

                if (element.name) {
                    formData[element.name] = element.value; // Lưu giá trị theo `name`
                }
            }


            const date1 = new Date(formData.ngay_hieu_luc);
            const date2 = new Date(formData.ngay_hoan_thanh);

            if (date1 > date2) {
                message.error("Ngày kết thúc phải lớn hơn ngày hiệu lực");
                error = true;
            }
            if (!error)
                setValueSearchHopdong({ input: formData.input, ngay_hieu_luc: formData.ngay_hieu_luc, ngay_hoan_thanh: formData.ngay_hoan_thanh });
        }

        else setValueSearchHopdong({ input: '', ngay_hieu_luc: '', ngay_hoan_thanh: '' });


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


    const callAPI_AddHopdong = async (ma_quang_cao, luot_phat, doanh_thu, ngay_hieu_luc, ngay_hoan_thanh) => {
        try {
            const response = await axios.post(`${url}/api/advertising-contracts`, {
                ma_quang_cao: ma_quang_cao,
                luot_phat: luot_phat,
                doanh_thu: doanh_thu,
                ngay_hieu_luc: ngay_hieu_luc,
                ngay_hoan_thanh: ngay_hoan_thanh
            });
            let qc = advertisementsData.find((item) => item.ma_quang_cao == ma_quang_cao);
            setContract((prev) => [...prev, {
                ma_hop_dong: response.data.ma_hop_dong,
                ma_quang_cao: ma_quang_cao,
                ten_quang_cao: qc.ten_quang_cao,
                luot_phat: luot_phat,
                doanh_thu: doanh_thu,
                ngay_hieu_luc: ngay_hieu_luc,
                hinh_anh: qc.hinh_anh,
                ngay_hoan_thanh: ngay_hoan_thanh
            }]);

        } catch (err) {
            console.log("loi them hop dong");
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

        const date1 = new Date(formData.ngay_hieu_luc);
        const date2 = new Date(formData.ngay_hoan_thanh);

        if (date1 > date2) {
            message.error("Ngày kết thúc phải lớn hơn ngày hiệu lực");
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
                    callAPI_AddHopdong(keySelected, formData.luot_phat, formData.doanh_thu, formData.ngay_hieu_luc + " 00:00:00", formData.ngay_hoan_thanh + " 00:00:00");

                    setIsAdding(false);
                    setBgCover(false);
                    setKeySelected("");
                },
                onCancel() {

                },
            });
        }
    }

    function FormAdd() {
        const quangcao = advertisementsData.find((item) => item.ma_quang_cao == keySelected);
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
                        <p className='text-[#A4A298]'>Chọn ngày hợp đồng có hiệu lực</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                            type="date"
                            name='ngay_hieu_luc'
                            defaultValue={today} // Giá trị mặc định là ngày hiện tại
                            min={today} // Giới hạn tối đa là ngày hiện tại
                        />
                        <p className='text-[#A4A298]'>Chọn ngày kết thúc hợp đồng</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                            type="date"
                            name='ngay_hoan_thanh'
                            defaultValue={tomorrow} // Giá trị mặc định là ngày hiện tại
                            min={tomorrow} // Giới hạn tối đa là ngày hiện tại
                        />
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
            {isGettingContractsData ? (<div className="wrap-loader"><span className="loader"></span></div>) :
                (<>
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
                                <label className="mb-2 text-[#A4A298]">Ngày hiệu lực</label>
                                <input
                                    className=" p-1 w-fit  outline-none bg-[#A4A298] mb-2 text-black"
                                    type="date"
                                    name='ngay_hieu_luc'
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label className="mb-2 text-[#A4A298]">Ngày kết thúc</label>
                                <input
                                    className=" p-1 w-fit  outline-none bg-[#A4A298] mb-2 text-black"
                                    type="date"
                                    name='ngay_hoan_thanh'
                                />
                            </div>


                            {/* Search Button */}
                            <div className='flex flex-col w-[100px] gap-1'>
                                <Button type="primary" htmlType="submit" className='rounded-3xl bg-[#E0066F]   hover:!bg-[#E0066F]'>
                                    Tìm kiếm
                                </Button>
                                <Button type="primary" htmlType="reset" className='rounded-3xl bg-[#E0066F]   hover:!bg-[#E0066F]' onClick={searchHopdong}>
                                    Xóa
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
                    {
                        contractsData.length == 0 ? <div className='w-full h-[50vh] flex items-center justify-center'>Chưa có hợp đồng</div> :
                            (<>
                                <label className='mt-6 mb-3 block'>Tổng cộng: {JSON.stringify(valueSearchHopdong) === JSON.stringify({ input: '', ngay_hieu_luc: today, ngay_hoan_thanh: tomorrow }) ? contractsData.length : filterHopdong.length} hợp đồng</label>
                                <div className='grid grid-cols-5 gap-2 w-full h-[50vh] overflow-y-auto'>
                                    <ItemHopDong list={JSON.stringify(valueSearchHopdong) === JSON.stringify({ input: '', ngay_hieu_luc: today, ngay_hoan_thanh: tomorrow }) ? contractsData : filterHopdong} />

                                </div>
                            </>)
                    }

                </>)
            }

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