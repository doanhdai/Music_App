import React, { useEffect, useState, useReducer, useContext } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { AdminContext } from '../../context/AdminContext';

const taikhoanList = [
  {ma_tk: 1, ma_phan_quyen: 'Q1'}
]

let quyenList = [
  { ma_phan_quyen: 'Q1', ten_quyen_han: "admin", ngay_tao: "24/10/2003", tinh_trang: 1 },
  { ma_phan_quyen: 'Q2', ten_quyen_han: "user", ngay_tao: "22/10/2003", tinh_trang: 1 },
  { ma_phan_quyen: 'Q3', ten_quyen_han: "artist", ngay_tao: "24/10/1999", tinh_trang: 1 }
];

let chucnangList = [
  { ma_chuc_nang: 'CN1', ten_chuc_nang: 'Tài khoản' },
  { ma_chuc_nang: 'CN2', ten_chuc_nang: 'Bài hát' },
  { ma_chuc_nang: 'CN3', ten_chuc_nang: 'Album' },
  { ma_chuc_nang: 'CN4', ten_chuc_nang: 'Quyền' },
  { ma_chuc_nang: 'CN5', ten_chuc_nang: 'Quảng cáo' },
  { ma_chuc_nang: 'CN6', ten_chuc_nang: 'Thống kê' },
];

let chitietquyenList = [
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN1', mo_ta_vai_tro: 'Xem' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN1', mo_ta_vai_tro: 'Thêm' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN1', mo_ta_vai_tro: 'Sửa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN1', mo_ta_vai_tro: 'Xóa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN2', mo_ta_vai_tro: 'Xem' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN2', mo_ta_vai_tro: 'Thêm' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN2', mo_ta_vai_tro: 'Sửa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN2', mo_ta_vai_tro: 'Xóa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN3', mo_ta_vai_tro: 'Xem' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN3', mo_ta_vai_tro: 'Thêm' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN3', mo_ta_vai_tro: 'Sửa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN3', mo_ta_vai_tro: 'Xóa' },
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN6', mo_ta_vai_tro: 'Xem' }
];

const actionList = {
  add: 'ADD',
  update: 'UPDATE',
  select_update: 'SELECT_UPDATE',
  select_delete: 'SELECT_DELETE',
  delete: 'DELETE',
  cancel_update: 'CANCEL_UPDATE',
  cancel_delete: 'CANCEL_DELETE'
}

function reducerBgCover(state, action) {
  switch (action.type) {
    case actionList.add:
      return true;
    default:
      return false;
  }
}

const ManagerQuyen = () => {
  const [currentQuyen, setCurrentQuyen] = useState(quyenList[0].ma_phan_quyen);
  const [filteredChitietquyenList, setFilteredChitietquyenList] = useState([]);
  const { isBgCover, setBgCover } = useContext(AdminContext);
  const [valueAction, setValueAction] = useState("");
  const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);

  const handleChange = (event) => {
    setCurrentQuyen(event.target.value);
  };

  const handleAction = (action) => {
    setValueAction(action);
    dispatchBgCover({ type: action });
  };

  const ItemsQuyen = () => (
    <select
      className='bg-[#1E1E1E] text-white p-2.5 rounded-3xl border-none w-[150px] outline-none cursor-pointer ml-2'
      onChange={handleChange}
    >
      {quyenList.map((quyen) => (
        quyen.tinh_trang === 1 &&
        <option key={quyen.ma_phan_quyen} value={quyen.ma_phan_quyen}
          selected={quyen.ma_phan_quyen === currentQuyen}>
          {quyen.ten_quyen_han}
        </option>
      ))}
    </select>
  );

  const handleCheckboxChange = (chucNang, moTaVaiTro, isChecked) => {
    if (valueAction == actionList.update) {
      let updatedList = [...filteredChitietquyenList]; // Tạo bản sao mới

      if (isChecked) {
        updatedList.push({ ma_phan_quyen: currentQuyen, ma_chuc_nang: chucNang, mo_ta_vai_tro: moTaVaiTro });
      } else {
        updatedList = updatedList.filter(
          (item) =>
            item.ma_phan_quyen !== currentQuyen ||
            item.ma_chuc_nang !== chucNang ||
            item.mo_ta_vai_tro !== moTaVaiTro
        );
      }
      setFilteredChitietquyenList(updatedList); // Cập nhật state với bản sao mới
    }



  };

  const handleDeleteQuyen = () => {
    if (!(taikhoanList.some((item)=> item.ma_phan_quyen == currentQuyen))){
      chitietquyenList = chitietquyenList.filter((item)=> item.ma_phan_quyen != currentQuyen);
      quyenList = quyenList.filter((item)=> item.ma_phan_quyen != currentQuyen);
      setCurrentQuyen(quyenList[0].ma_phan_quyen);
    }
    else alert('Không thể xóa quyền này do có tài khoản thuộc quyền này!');   
  }


  const TableChitietquyen = () => (
    <div>
      <table className='bg-[#1E1E1E] w-full h-auto '>
        <thead>
          <tr className='border-b border-[#A4A298] text-[#A4A298]'>
            <th className='w-[10%] py-3'>&nbsp;</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {chucnangList.map((chucnang) => {
            const chitietquyen = filteredChitietquyenList.filter(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);
            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center'>
                <td className='py-3 text-left pl-4'>{chucnang.ten_chuc_nang}</td>
                {['Xem', 'Thêm', 'Sửa', 'Xóa'].map((vaiTro) => (
                  <td key={vaiTro}>
                    <input
                      type="checkbox"
                      checked={chitietquyen.some(item => item.mo_ta_vai_tro === vaiTro)}
                      // disabled={valueAction !== actionList.update}
                      onChange={(event) => handleCheckboxChange(chucnang.ma_chuc_nang, vaiTro, event.target.checked)}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );


  function FormAdd() {
    return (
      <form className="bg-[#1E1E1E] w-auto p-4">
        <p className='text-[#A4A298]'>Nhập tên quyền</p>
        <input
          className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2"
          type="text"
        />
        <p className='text-[#EB2272] italic'></p>
        <div className="flex justify-center mt-4 gap-2">
          <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => handleAction("")}>Hủy</button>
          <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black'>Xác nhận</button>

          {/* <Button onClick={() => dispatchBgCover({ type: actionList.add_cl_cancel })}>Hủy</Button>
            <Button className="ml-2 bg-[#EB2272] outline-none"></Button> */}
        </div>
      </form>
    );
  }



  useEffect(() => {
    // Lọc danh sách chi tiết quyền theo quyền hiện tại
    const filtered = chitietquyenList.filter(item => item.ma_phan_quyen === currentQuyen);
    setFilteredChitietquyenList(filtered);
  }, [currentQuyen]);

  useEffect(() => {
    setBgCover(stateBgCover);
  }, [stateBgCover, setBgCover]);

  return (
    <div className='w-full h-full bg-black p-3'>
      <div className='flex justify-between '>
        <div className='flex items-center w-[60%]'>
          <label className="text-[#A4A298]">{valueAction != actionList.update ? 'Chọn quyền' : 'Quyền'}</label>
          {
            valueAction != actionList.update ? <ItemsQuyen /> :
              <form className='w-full flex justify-between'>
                <input type="text" placeholder={quyenList.find((item)=> item.ma_phan_quyen == currentQuyen)?.ten_quyen_han}
                className='bg-[#1E1E1E] outline-none p-2 mx-2' 
                autoFocus/>
                <button type='submit' className='bg-[#EB2272] py-1 px-4 text-black '>Lưu thay đổi</button>
              </form>
          }


        </div>
        <div className='w-[15%] flex justify-between'>
          <div className='w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer'>
            <CiCirclePlus size={30} onClick={() => handleAction(actionList.add)} />
          </div>
          <div className={`w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer ${valueAction == actionList.update ? 'bg-[#EB2272]' : 'bg-[#1E1E1E]'}`}>
            <MdOutlineEdit size={30} onClick={() => handleAction(valueAction == actionList.update ? actionList.cancel_update : actionList.update)} />
          </div>
          <div className='w-[45px] h-[45px] flex items-center justify-center rounded-full bg-[#1E1E1E] cursor-pointer' >
            <MdDeleteOutline size={30} onClick={() => handleDeleteQuyen()} />
          </div>
        </div>
      </div>
      <p className="text-[#A4A298] my-6">
        Ngày tạo:
        <span className='ml-2'>
          {quyenList.find(quyen => quyen.ma_phan_quyen === currentQuyen)?.ngay_tao || 'N/A'}
        </span>
      </p>
      <TableChitietquyen />
      {stateBgCover && (
        <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center">
          {
            (() => {
              switch (valueAction) {
                case actionList.add:
                  return <FormAdd />

                default:
                  return null;
              }
            })()
          }
        </div>
      )}
    </div>
  );
};

export default ManagerQuyen;
