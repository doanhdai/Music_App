import React, { useEffect, useState, useReducer, useContext } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { AdminContext } from '../../context/AdminContext';

const taikhoanList = [
  { ma_tk: 1, ma_phan_quyen: 'Q1' }
]

let quyenList = [
  { ma_phan_quyen: 'Q1', ten_quyen_han: "admin", ngay_tao: "2024-11-11 20:00:00", tinh_trang: 1 },
  { ma_phan_quyen: 'Q2', ten_quyen_han: "user", ngay_tao: "2024-11-11 20:00:00", tinh_trang: 1 },
  { ma_phan_quyen: 'Q3', ten_quyen_han: "artist", ngay_tao: "2024-11-11 20:00:00", tinh_trang: 1 }
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
  { ma_phan_quyen: 'Q1', ma_chuc_nang: 'CN6', mo_ta_vai_tro: 'Xem' },
  { ma_phan_quyen: 'Q2', ma_chuc_nang: 'CN6', mo_ta_vai_tro: 'Xem' }
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
    case actionList.update:
      return true;
    default:
      return false;
  }
}

const ManagerQuyen = () => {
  const [currentQuyen, setCurrentQuyen] = useState(quyenList[0].ma_phan_quyen);
  const [filteredChitietquyenList, setFilteredChitietquyenList] = useState([]);
  const [chitietquyenUpdate, setChiTietQuyenUpdate] = useState([]);
  const { isBgCover, setBgCover } = useContext(AdminContext);
  const [valueAction, setValueAction] = useState("");
  const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);
  const [valueInputAdd, setValueInputAdd] = useState("");
  const [errorInputAdd, setError] = useState("");
  const [chitietquyenAdd, setChitietquyenAdd] = useState([]);

  const handleChange = (event) => {
    setCurrentQuyen(event.target.value);
  };

  const handleAction = (action) => {
    if (currentQuyen == quyenList[0].ma_phan_quyen && action == actionList.update)
      alert('Đây là quyền cao cấp. Không thể thay đổi quyền này!');
    else {
      if (action == actionList.update) setChiTietQuyenUpdate(filteredChitietquyenList);
      dispatchBgCover({ type: action });
      setValueAction(action);
    }
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



  const handleDeleteQuyen = () => {
    if (!(taikhoanList.some((item) => item.ma_phan_quyen == currentQuyen))) {
      chitietquyenList = chitietquyenList.filter((item) => item.ma_phan_quyen != currentQuyen);
      quyenList = quyenList.filter((item) => item.ma_phan_quyen != currentQuyen);
      setCurrentQuyen(quyenList[0].ma_phan_quyen);
    }
    else alert('Không thể xóa quyền này do có tài khoản thuộc quyền này!');
  }

  const TableChitietquyenUpdate = () => (
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
            const chitietquyen = chitietquyenUpdate.filter(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);
            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center'>
                <td className='py-3 text-left pl-4'>{chucnang.ten_chuc_nang}</td>
                {
                  ['Xem', 'Thêm', 'Sửa', 'Xóa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      <input
                        type="checkbox"
                        checked={chitietquyen.some(item => item.mo_ta_vai_tro === vaiTro)}
                        onChange={(event) => {
                          let isChecked = event.target.checked;
                          setChiTietQuyenUpdate((prevChitietquyenAdd) => {
                            if (isChecked) {
                              // Thêm phần tử mới khi checkbox được chọn
                              return [...prevChitietquyenAdd, { ma_phan_quyen: currentQuyen, ma_chuc_nang: chucnang.ma_chuc_nang, mo_ta_vai_tro: vaiTro }];
                            } else {
                              // Loại bỏ phần tử khi checkbox bị bỏ chọn
                              return prevChitietquyenAdd.filter(
                                (item) => item.ma_chuc_nang !== chucnang.ma_chuc_nang || item.mo_ta_vai_tro !== vaiTro
                              );
                            }
                          });
                        }}
                      />
                    </td>))
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )



  const TableChitietquyenAdd = () => (
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
            const chitietquyen = chitietquyenAdd.filter(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);
            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center'>
                <td className='py-3 text-left pl-4'>{chucnang.ten_chuc_nang}</td>
                {
                  ['Xem', 'Thêm', 'Sửa', 'Xóa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      <input
                        type="checkbox"
                        checked={chitietquyen.some(item => item.mo_ta_vai_tro === vaiTro)}
                        onChange={(event) => {
                          let isChecked = event.target.checked;
                          setChitietquyenAdd((prevChitietquyenAdd) => {
                            if (isChecked) {
                              // Thêm phần tử mới khi checkbox được chọn
                              return [...prevChitietquyenAdd, { ma_chuc_nang: chucnang.ma_chuc_nang, mo_ta_vai_tro: vaiTro }];
                            } else {
                              // Loại bỏ phần tử khi checkbox bị bỏ chọn
                              return prevChitietquyenAdd.filter(
                                (item) => item.ma_chuc_nang !== chucnang.ma_chuc_nang || item.mo_ta_vai_tro !== vaiTro
                              );
                            }
                          });
                        }}
                      />
                    </td>))
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )



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
                {
                  ['Xem', 'Thêm', 'Sửa', 'Xóa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      <input
                        type="checkbox"
                        checked={chitietquyen.some(item => item.mo_ta_vai_tro === vaiTro)}
                      />
                    </td>))
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  const addQuyen = () => {
    let flagExist = false;
    setValueInputAdd(valueInputAdd.trim());
    quyenList.forEach((item) => {
      if (item.ten_quyen_han === valueInputAdd) {
        setError('Tên quyền đã tồn tại');
        flagExist = true;
        return;
      }
    });
    if (!flagExist) {
      let ma_phan_quyen = 'Q4';
      let newQuyen = { ma_phan_quyen: ma_phan_quyen, ten_quyen_han: valueInputAdd, ngay_tao: getCurrentDateTime(), tinh_trang: 1 };
      quyenList.push(newQuyen);
      const updatedChitietquyenAdd = chitietquyenAdd.map((item) => ({
        ...item,
        ma_phan_quyen: ma_phan_quyen
      }));
      chitietquyenList.push(...updatedChitietquyenAdd);
      setError("");
      setValueInputAdd("");
      setChitietquyenAdd([]);
      handleAction(actionList.add_cancel);

    }

  }

  const updateQuyen = () => {
    let flagExist = false;
    setValueInputAdd(valueInputAdd.trim());
    if (valueInputAdd != '') {

      quyenList.forEach((item) => {
        if (item.ten_quyen_han === valueInputAdd) {
          setError('Tên quyền đã tồn tại');
          flagExist = true;
          return;
        }
      });
    }
    if (!flagExist) {
      let i = confirm('Bạn có muốn lưu thay đổi?');
      if (i) {
        alert('Đã lưu thay đổi');
        setFilteredChitietquyenList(chitietquyenUpdate);
        if (valueInputAdd != '') {
          quyenList.find((item) => item.ma_phan_quyen === currentQuyen).ten_quyen_han = valueInputAdd;
        }
        setError("");
        setValueInputAdd("");
        setChiTietQuyenUpdate([]);
        handleAction(actionList.cancel_update);
        chitietquyenUpdate.forEach((item) => {
          chitietquyenList = chitietquyenList.filter((item1) => item1.ma_phan_quyen != currentQuyen || item1.ma_chuc_nang != item.ma_chuc_nang || item1.mo_ta_vai_tro != item.mo_ta_vai_tro);
        })

        chitietquyenList.push(...chitietquyenUpdate);
      } else {

      }

    }

  }

  function FormUpdate() {
    return (
      <div className='bg-[#1E1E1E] w-[50vw]'>
        <form className=" w-auto p-4">
          <p className='text-[#A4A298]'>Nhập tên quyền</p>
          <input
            value={valueInputAdd}
            onChange={(event) => setValueInputAdd(event.target.value)}
            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2 "
            type="text"
            placeholder={quyenList.find((item) => item.ma_phan_quyen == currentQuyen)?.ten_quyen_han}
            autoFocus
          />
          <p className='text-[#EB2272] italic'>{errorInputAdd}</p>
          <TableChitietquyenUpdate />
          <div className="flex justify-center mt-4 gap-2">
            <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => { setValueInputAdd(''); setError(""); handleAction("") }}>Hủy</button>
            <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' onClick={(e) => { e.preventDefault(); updateQuyen(); }}>Xác nhận</button>
          </div>
        </form>

      </div>
    );
  }


  function FormAdd() {

    return (
      <div className='bg-[#1E1E1E] w-[50vw]'>
        <form className=" w-auto p-4">
          <p className='text-[#A4A298]'>Nhập tên quyền</p>
          <input
            value={valueInputAdd}
            onChange={(event) => setValueInputAdd(event.target.value)}
            className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2 "
            type="text"
            autoFocus
          />
          <p className='text-[#EB2272] italic'>{errorInputAdd}</p>
          <TableChitietquyenAdd />
          <div className="flex justify-center mt-4 gap-2">
            <button className='bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]' onClick={() => { setChitietquyenAdd([]); setValueInputAdd(''); setError(""); handleAction("") }}>Hủy</button>
            <button className='bg-[#EB2272] p-1 pl-2 pr-2 text-black' onClick={(e) => { e.preventDefault(); addQuyen(); }}>Xác nhận</button>
          </div>
        </form>

      </div>
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
                <input type="text" placeholder={quyenList.find((item) => item.ma_phan_quyen == currentQuyen)?.ten_quyen_han}
                  className='bg-[#1E1E1E] outline-none p-2 mx-2'
                  autoFocus />
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
                  // setChitietquyenAdd([]);
                  return <FormAdd />
                case actionList.update:
                  // setChiTietQuyenUpdate(filteredChitietquyenList);
                  return <FormUpdate />
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
