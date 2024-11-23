import React, { act, useContext, useEffect, useReducer, useState, useRef } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from 'react-icons/io';
import { Button, message, Modal } from 'antd';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const url = "http://localhost:8000";


const actionList = {
    add: 'ADD',
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
        case actionList.add:
            return true;
        default:
            return false;
    }
}

const ManagerType = () => {
    const [keySelected, setKeySelected] = useState("");
    const [valueAction, setValueAction] = useState("");
    const { isBgCover, setBgCover, theloaiList, setTheloaiList } = useContext(AdminContext);
    const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);
    const [valueInputSearch, setValueInputSearch] = useState("");
    const [valueInputAdd, setValueInputAdd] = useState("");
    const [arrayValue, setArrayValue] = useState([]);
    const [errorInputAdd, setError] = useState("");


    useEffect(() => {
        setBgCover(stateBgCover);
    }, [stateBgCover, setBgCover]);

    useEffect(() => {
        if (valueAction == actionList.select_tl_delete) {
            message.info('Bạn đang ở chế độ xóa thể loại.\nNhấp chuột vào thể loại cần xóa!');
        }
    }, [valueAction]);

    const handleAction = (action) => {
        setValueAction(action);
        dispatchBgCover({ type: action });
    };

    const handleSearch = () => {
        if (valueInputSearch != '') {
            let result = [];
            theloaiList.forEach((item) => {
                if ((item.ten_the_loai.toLowerCase()).includes(valueInputSearch.trim().toLowerCase())) {
                    result.push(item);
                }
            });
            setArrayValue(result);
        }

    };

    useEffect(() => {
        handleSearch();
    }, [valueInputSearch, setValueInputSearch]);



    function FormAddTL() {
        return (
            <form className="bg-[#1E1E1E] w-auto p-4">
                <p className='text-[#A4A298]'>Nhập tên thể loại</p>
                <input
                    className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
                    type="text"
                    value={valueInputAdd}
                    name='ten'
                    onChange={(event) => setValueInputAdd(event.target.value)}
                    autoFocus
                />
                <p className='text-[#EB2272] italic'>{errorInputAdd}</p>
                <div className="flex justify-center mt-4 gap-2">
                    <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => { setValueInputAdd(""); setError(""); handleAction(actionList.add_tl_cancel); }}>Hủy</button>
                    <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' onClick={(e) => { e.preventDefault(); addTheloai(); }}>Xác nhận</button>

                    {/* <Button onClick={() => dispatchBgCover({ type: actionList.add_cl_cancel })}>Hủy</Button>
                <Button className="ml-2 bg-[#EB2272] outline-none"></Button> */}
                </div>
            </form>
        )
    }
    const callAPI_add = async () => {
        try {
            const response = await axios.post(`${url}/api/genre`, {
                ten_the_loai: valueInputAdd,
            });
            return response.data.data;


        } catch (err) {
            setError('Có lỗi xảy ra khi tạo thể loại.');
            alert('Error creating genre:', err.response || err.message || err);
        }
    }

    const addTheloai = async () => {
        let flagExist = false;
        theloaiList.forEach((item) => {
            if (item.ten_the_loai === valueInputAdd) {
                setError('Tên đã tồn tại');
                flagExist = true;
                return;
            }
        });
        if (!flagExist) {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
                content: 'Thêm thể loại ',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk() {
                    callAPI_add().then((data) => {
                        const newMa_the_loai = data;
                        let newTheloai = { ma_the_loai: newMa_the_loai, ten_the_loai: valueInputAdd };
                        handleAction(actionList.add_tl_cancel);
                        message.success("Thêm thành công");

                        setValueInputAdd('');
                        setArrayValue([...arrayValue, newTheloai]);
                        setTheloaiList((prev) => [...prev, newTheloai]);
                    })

                },
                onCancel() {

                },
            });
        }
    }

    const callAPI_checkTheloai = async (ma_the_loai) => {
        try {
            const response = await axios.get(`${url}/api/genre/songs/${ma_the_loai}`);
            console.log(response);
            if (response.status == 200) {
                return 1;
            }

        } catch (err) {
            return 0;
        }
    }

    const callAPI_Delete = async (ma_the_loai) => {
        try {
            const response = await axios.delete(`${url}/api/genre/${ma_the_loai}`);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTheLoai = async (ma_the_loai) => {
        setValueAction(actionList.delete_tl_cancel);
        callAPI_checkTheloai(ma_the_loai).then((data) => {
            const soluong = data;
            if (soluong == 0) {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
                    content: 'Xóa thể loại ' + ma_the_loai,
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    onOk() {
                        callAPI_Delete(ma_the_loai);
                        message.success('Xóa thành công');
                        setTheloaiList((prev) => prev.filter(theloai => theloai.ma_the_loai !== ma_the_loai));
                        setArrayValue((prev) => prev.filter(theloai => theloai.ma_the_loai !== ma_the_loai));
                    },
                    onCancel() {

                    },
                });
            } else {
                message.error('Không thể xóa thể loại này, do thể loại đã thuộc 1 bài hát nào đó');
            }

        });



    };



    function ItemTheloai({ list }) {
        let array1 = list;

        return array1.map((theloai) => {
            return (
                <div
                    key={theloai.ma_the_loai}
                    className={`grid grid-cols-4 w-full items-center pt-3 pb-3 ${(valueAction === actionList.select_tl_update || valueAction === actionList.select_tl_delete) && 'hover:!bg-[#EB2272] cursor-pointer'
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

                </div>
            );
        });
    }




    return (
        <div className="mt-2 bg-black h-[100%]">
            {
                theloaiList.length === 0 ? (<div className="wrap-loader"><span className="loader"></span></div>) :
                    (
                        <>
                            {/* Phần giao diện cho thể loại */}
                            <div className="col-span-3 pl-[1em] pr-[1em]">
                                <div className='flex justify-between w-full items-center'>
                                    <form className='flex w-full h-full items-center mt-6 mb-6 gap-2'>
                                        <div className="flex items-center p-2.5 w-[25%] h-full bg-[#1E1E1E] justify-between rounded-3xl">
                                            <IoIosSearch className="text-white text-2xl cursor-pointer" />
                                            <input
                                                className="bg-[#1E1E1E] w-full outline-none ml-2 text-white text-xs font-bold"
                                                type="text"
                                                value={valueInputSearch}
                                                placeholder="Tên thể loại"
                                                onChange={(event) => setValueInputSearch(event.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                    </form>
                                    <div className='flex w-fit gap-2'>
                                        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer">
                                            <CiCirclePlus size={25} onClick={() => handleAction(actionList.add)} />
                                        </div>
                                        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-full  cursor-pointer ${valueAction == actionList.select_tl_delete ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
                                            <MdDeleteOutline size={25} onClick={() => handleAction(valueAction == actionList.select_tl_delete ? actionList.delete_tl_cancel : actionList.select_tl_delete)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Bảng hiển thị thể loại */}
                                <div className='w-full bg-[#141414]'>
                                    <div className='grid grid-cols-4 w-full items-center pt-3 pb-3 border-b border-[#A4A298] text-[#A4A298]'>
                                        <div className='text-center'>Mã</div>
                                        <div className='col-span-3 text-center'>Tên thể loại</div>
                                    </div>
                                    <div className="w-full h-[60vh] overflow-y-auto">
                                        <ItemTheloai list={valueInputSearch == '' ? theloaiList : arrayValue} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }


            {/* Hiển thị modal hoặc nội dung khác dựa trên valueAction */}
            {
                stateBgCover && (
                    <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                        {
                            (() => {
                                switch (valueAction) {

                                    case actionList.add:
                                        return <FormAddTL />
                                    default:
                                        return null;
                                }
                            })()
                        }
                    </div>
                )
            }
        </div >
    );
}

export default ManagerType;


