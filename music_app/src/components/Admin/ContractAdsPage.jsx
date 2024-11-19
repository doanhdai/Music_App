import { IoIosSearch } from 'react-icons/io'
import { Button } from 'antd'
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { useState, useContext, useEffect } from 'react';
import { PlayerContext } from "../../context/PlayerContext";

let quangcaoList = [
    { ma_quang_cao: 1, ten_quang_cao: 'Chạy ngay đi vừa ra mắt! Nghe thử ngay! fa fa rgferag rregt qergfer gqretfgesf è gegerfgae fdafa dfa dfa adsgagaga', ngay_tao: '23/10/2001', ma_nqc: 'NQC1', hinh_anh: assets.mck },
    { ma_quang_cao: 2, ten_quang_cao: 'Nghe bài hát mới của Sơn Tùng MTP', ngay_tao: '05/02/1998', ma_nqc: 'NQC1', hinh_anh: assets.like_icon },
    { ma_quang_cao: 3, ten_quang_cao: 'Rap Việt vừa ra mắt! Xem ngay trên trang youtube: Đông Tây Promotion', ngay_tao: '02/01/1996', ma_nqc: 'NQC2', hinh_anh: assets.loop_icon },
    { ma_quang_cao: 4, ten_quang_cao: 'Mộng Yu cùng AMEE! Nghe Mộng Yu ngay!', ngay_tao: '22/07/1990', ma_nqc: 'NQC3', hinh_anh: assets.clock_icon }
]

let hopdongList = [
    { ma_hop_dong: 1, ma_quang_cao: 1, luot_phat: 211, doanh_thu: 10000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
    { ma_hop_dong: 2, ma_quang_cao: 2, luot_phat: 231, doanh_thu: 10440000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
    { ma_hop_dong: 3, ma_quang_cao: 3, luot_phat: 111, doanh_thu: 4500000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
    { ma_hop_dong: 4, ma_quang_cao: 4, luot_phat: 209, doanh_thu: 9000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
    { ma_hop_dong: 5, ma_quang_cao: 1, luot_phat: 230, doanh_thu: 10500000, ngay_tao: '23/12/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
    { ma_hop_dong: 6, ma_quang_cao: 3, luot_phat: 146, doanh_thu: 5400000, ngay_tao: '23/11/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
    { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '09/09/2023 18:00:33', ngay_hoan_thanh: '' },
]




function ContractPage() {
    const { adsContractData } = useContext(PlayerContext);
    const [isAdding, setIsAdding] = useState(false);
    const { isBgCover, setBgCover } = useContext(AdminContext);
    const [keySelected, setKeySelected] = useState("");
    const [image, setImage] = useState("");
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

    function ItemHopDong() {
        let array1 = hopdongList;
        let array2 = quangcaoList;
        return array1.map((hopdong) => (
            <div className='bg-[#1E1E1E] ' key={hopdong.ma_hop_dong}>
                <div className='flex justify-between'>
                    <div className='bg-[#E0066F] text-black p-1 font-bold'>{hopdong.ma_hop_dong}</div>
                    <div className='bg-[#E0066F] text-black p-1 '>{hopdong.ngay_hoan_thanh === '' ? 'Còn thời hạn' : 'Hoàn thành'}</div>
                </div>

                <div className='p-3 flex flex-col gap-1 text-gray-400 '>
                    {
                        array2.map((item) => (
                            item.ma_quang_cao === hopdong.ma_quang_cao &&
                            <>
                                <img src={item.hinh_anh} className='w-full h-auto' />
                                <div className='text-lg font-bold py-1 text-white '>{item.ten_quang_cao}</div>
                            </>
                        ))
                    }

                    <div className="flex flex-row items-center  gap-2">
                        <FaHeadphones />
                        <span>{hopdong.luot_phat}</span>
                    </div>
                    <div >
                        <span>{hopdong.ngay_tao.split(' ')[0]} - </span>
                        <span>{hopdong.ngay_hoan_thanh !== '' ? hopdong.ngay_hoan_thanh.split(' ')[0] : '?'}</span>
                    </div>
                    <div className='text-lg'>{hopdong.doanh_thu} đ</div>
                </div>

            </div>
        ));
    }

    function FormAdd() {
        const quangcao = quangcaoList.find((item) => item.ma_quang_cao == keySelected);
        return (
            <div className=' flex bg-[#1E1E1E]'>
                <div className='w-[25vw]  p-2  border-r'>
                    <div>
                        <form className='flex gap-2 h-[40px] '>
                            <div className='flex items-center p-2 w-[80%] bg-black justify-between rounded-3xl'>
                                <IoIosSearch className="text-white text-2xl cursor-pointer " />
                                <input
                                    className="bg-black w-[100%] outline-none ml-3 text-white"
                                    type="text"
                                    placeholder="Tên quảng cáo"
                                />
                            </div>
                            <Button type="primary" className='rounded-3xl bg-[#E0066F] h-hull w-fit hover:!bg-[#E0066F]'>
                                Tìm kiếm
                            </Button>
                        </form>
                    </div>
                    <div className='w-full h-[40vh] overflow-y-auto'>
                        {
                            quangcaoList.map((item) =>
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
                    <form >
                        <p style={{ maxHeight: '1.5em' }} className='text-xl  font-bold mb-2 overflow-y-scroll '>{quangcao ? quangcao.ten_quang_cao : 'Chưa chọn quảng cáo'}</p>
                        <p className='text-[#A4A298]'>Nhập số lượt phát</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                            type="number"
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <p className='text-[#A4A298]'>Nhập giá hợp đồng</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                            type="number"
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <p className='text-[#A4A298]'>Chọn ngày hợp đồng có hiệu lực</p>
                        <input
                            className=" p-1 w-[300px] mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                            type="date"
                        />
                        <p className='text-[#EB2272] italic'></p>
                        <div className="flex justify-center my-3 gap-2">
                            <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => {

                                setIsAdding(false);
                                setBgCover(false);
                                setKeySelected("");
                            }}>Hủy</button>
                            <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='flex justify-between'>
                <form className='flex items-center space-x-5'>
                    {/* Search Box */}


                    <div className='flex flex-col'>
                        <label className='mb-2 text-[#A4A298]'>Tìm hợp đồng theo</label>

                        <div className='flex items-center p-2 w-[300px] bg-[#1E1E1E] justify-between rounded-3xl'>
                            <IoIosSearch className="text-white text-2xl cursor-pointer" />
                            <input
                                className="bg-[#1E1E1E] w-[100%] outline-none ml-3 text-white"
                                type="text"
                                placeholder="Tên quảng cáo"
                            />
                        </div>
                    </div>

                    {/* User Type Filter */}

                    <div className='flex flex-col'>
                        <label className="mb-2 text-[#A4A298]">Loại</label>
                        <select className='bg-[#1E1E1E] text-white p-2 rounded-3xl border-none w-[150px] outline-none cursor-pointer'>
                            <option>Tất cả</option>
                            <option>Hoàn thành</option>
                            <option>Còn thời hạn</option>
                        </select>
                    </div>


                    {/* Search Button */}
                    <div className='flex flex-col'>
                        <label className='mb-1'>&nbsp;</label> {/* Dùng label rỗng để giữ chiều cao tương tự */}
                        <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[35px] w-[100px] hover:!bg-[#E0066F]'>
                            Tìm kiếm
                        </Button>
                    </div>
                </form>
                <div className='flex flex-col'>
                    <label className='mb-1'>&nbsp;</label>
                    <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer'>
                        <CiCirclePlus size={25} onClick={() => {
                            setIsAdding(!isAdding);
                            setBgCover(true);
                        }} />
                    </div>


                </div>
            </div>
            <label className='mt-6 mb-3 block'>Tổng cộng: {hopdongList.length} hợp đồng</label>
            <div className='grid grid-cols-5 gap-2 w-full h-[50vh] overflow-y-auto'>
                <ItemHopDong />

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