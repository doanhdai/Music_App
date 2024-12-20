import React, { useEffect, useState, useReducer, useContext } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { getFunctionalDetail } from '../../services/UserServices';
import { message, Modal } from 'antd';

const url = "http://localhost:8000";

const chitietchucnang = [
  { ma_chuc_nang: 'FUNC0001', xem: 1, them: 1, sua: 1, xoa: 1 },
  { ma_chuc_nang: 'FUNC0002', xem: 1, them: 0, sua: 1, xoa: 0 },
  { ma_chuc_nang: 'FUNC0003', xem: 1, them: 0, sua: 1, xoa: 0 },
  { ma_chuc_nang: 'FUNC0004', xem: 1, them: 0, sua: 1, xoa: 0 },
  { ma_chuc_nang: 'FUNC0005', xem: 1, them: 1, sua: 0, xoa: 1 },
  { ma_chuc_nang: 'FUNC0006', xem: 1, them: 1, sua: 0, xoa: 1 },
  { ma_chuc_nang: 'FUNC0007', xem: 1, them: 1, sua: 1, xoa: 1 },
  { ma_chuc_nang: 'FUNC0008', xem: 1, them: 1, sua: 1, xoa: 1 },
  { ma_chuc_nang: 'FUNC0009', xem: 1, them: 1, sua: 1, xoa: 1 },
  { ma_chuc_nang: 'FUNC0010', xem: 1, them: 1, sua: 1, xoa: 1 },
  { ma_chuc_nang: 'FUNC0011', xem: 1, them: 0, sua: 0, xoa: 0 }
]

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
  const { chucnangList, setChucnangList, quyenList, setQuyenList, accountsData } = useContext(AdminContext);
  const [currentQuyen, setCurrentQuyen] = useState('AUTH0001');
  const [filteredChitietquyenList, setFilteredChitietquyenList] = useState([]);
  const [chitietquyenUpdate, setChiTietQuyenUpdate] = useState([]);
  const { isBgCover, setBgCover } = useContext(AdminContext);
  const [valueAction, setValueAction] = useState("");
  const [stateBgCover, dispatchBgCover] = useReducer(reducerBgCover, isBgCover);
  const [valueInputAdd, setValueInputAdd] = useState("");
  const [errorInputAdd, setError] = useState("");
  const [chitietquyenAdd, setChitietquyenAdd] = useState([]);
  const [isGettingChitietquyenData, setIsGettingChitietquyenData] = useState(true);



  // xoa
  const deleteQuyen = async (maPhanQuyen) => {
    try {
      const response = await axios.delete(`${url}/api/decentralizations/${maPhanQuyen}`);
    } catch (error) {
      console.error('Lỗi khi xóa phân quyền:', error.response?.data || error.message);
    }
  };
  const updatePhanQuyen = async (dataArray, existingData) => {
    try {
      // Lọc các bản ghi có sự thay đổi
      const dataToUpdate = dataArray.filter((item) => {
        const oldItem = existingData.find(
          (old) =>
            old.ma_phan_quyen === item.ma_phan_quyen &&
            old.ma_chuc_nang === item.ma_chuc_nang
        );

        // Kiểm tra sự khác biệt giữa bản ghi mới và cũ
        return (
          !oldItem || // Nếu không tìm thấy bản ghi cũ, coi như thay đổi
          oldItem.xem !== item.xem ||
          oldItem.them !== item.them ||
          oldItem.sua !== item.sua ||
          oldItem.xoa !== item.xoa
        );
      });

      // Gửi yêu cầu cập nhật cho các bản ghi đã thay đổi
      if (dataToUpdate.length === 0) {
        console.log("Không có bản ghi nào cần cập nhật.");
        return;
      }

      const responses = await Promise.all(
        dataToUpdate.map(async (item) => {
          const { ma_phan_quyen, ma_chuc_nang, xem, them, sua, xoa } = item;
          try {
            const response = await axios.put(`${url}/api/functionalDetail/update`, {
              ma_phan_quyen,
              ma_chuc_nang,
              xem,
              them,
              sua,
              xoa,
            });
            console.log(`Updated: ${ma_phan_quyen}`, response.data);
            return { success: true, data: response.data };
          } catch (error) {
            console.error(`Lỗi khi cập nhật: ${ma_phan_quyen}`, error.response?.data || error.message);
            return { success: false, error: error.response?.data || error.message };
          }
        })
      );

      // Kiểm tra kết quả tổng thể
      const successCount = responses.filter((res) => res.success).length;
      const failCount = responses.length - successCount;
      console.log(`Cập nhật hoàn tất: ${successCount} thành công, ${failCount} thất bại.`);
    } catch (error) {
      console.error("Lỗi không xác định khi cập nhật:", error.message);
    }
  };
  const updateTenQuyenHan = async (maPhanQuyen, tenQuyenHanMoi) => {
    try {
      const response = await axios.put(`${url}/api/updateNameDecentralization/${maPhanQuyen}`, {
        ten_quyen_han: tenQuyenHanMoi,
      });

      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật tên quyền hạn:', error);
    }
  };

  const getChitietquyen = async (ma_phan_quyen) => {
    try {
      const response = await axios.get(`${url}/api/decentralizations/${ma_phan_quyen}`);
      let chitiet = []
      response.data.chuc_nang.forEach((item) => chitiet.push(item.pivot))
      setFilteredChitietquyenList(chitiet);
      setIsGettingChitietquyenData(false);
    } catch (err) {
      console.error(err);
    }
  };
  const createQuyen = async (valueSentAPI) => {
    try {
      // Gửi yêu cầu POST tới API store để tạo phân quyền và chức năng
      const response = await axios.post(`${url}/api/decentralizations`, valueSentAPI);
      return response.data.decentralization.ma_phan_quyen;
    } catch (error) {
      console.error('Lỗi khi gọi API:', error.response?.data || error.message);
    }
  };

  const handleChange = (event) => {
    setCurrentQuyen(event.target.value);
  };

  const handleAction = (action) => {
    if (currentQuyen == quyenList[0].ma_phan_quyen && action == actionList.update) {
      message.error('Đây là quyền cao cấp. Không thể thay đổi quyền này!');
      return;
    }

    // else {
    if (action == actionList.update) setChiTietQuyenUpdate(filteredChitietquyenList);
    if (action == actionList.add) {
      setChitietquyenAdd(() =>
        chucnangList.map((item) => ({ ...item, xem: 0, them: 0, sua: 0, xoa: 0 })
        )
      );
    }
    dispatchBgCover({ type: action });
    setValueAction(action);
    // }
  };



  const ItemsQuyen = () => (
    <select
      className='bg-[#1E1E1E] text-white p-2.5 rounded-3xl border-none w-[150px] outline-none cursor-pointer ml-2'
      onChange={handleChange}
      value={currentQuyen}
    >
      {quyenList.map((quyen) => (
        (!['Artist', 'User'].includes(quyen.ten_quyen_han)) &&
        <option key={quyen.ma_phan_quyen} value={quyen.ma_phan_quyen}>
          {quyen.ten_quyen_han}
        </option>


      ))}
    </select>
  );



  const handleDeleteQuyen = () => {
    if (currentQuyen == quyenList[0].ma_phan_quyen) {
      message.error('Đây quyền cao cấp. Không thể xóa!');

    } else {
      if (!(accountsData.some((item) => item.ma_phan_quyen == currentQuyen))) {
        Modal.confirm({
          title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
          content: 'Xóa nhà đăng kí quảng cáo ',
          okText: 'Đồng ý',
          cancelText: 'Hủy',
          onOk() {
            deleteQuyen(currentQuyen);
            setQuyenList((prev) => prev.filter((item) => item.ma_phan_quyen != currentQuyen));
            setCurrentQuyen(quyenList[0].ma_phan_quyen);
          },
          onCancel() {

          },
        });


      }
      else message.error('Không thể xóa quyền này do có tài khoản thuộc quyền này!');
    }

  }

  const TableChitietquyenUpdate = () => (
    <div>
      <table className='bg-[#1E1E1E] w-full h-auto '>
        <thead>
          <tr className='border-b border-[#A4A298] text-[#A4A298] grid grid-cols-6 items-center'>
            <th className='py-2 col-span-2'>&nbsp;</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {chucnangList.map((chucnang) => {
            const chitietcn = chitietchucnang.find((item) => item.ma_chuc_nang == chucnang.ma_chuc_nang);
            const chitietquyen = chitietquyenUpdate.find(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);

            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center grid grid-cols-6 items-center'>
                <td className='py-2 text-left col-span-2 '>{chucnang.ten_chuc_nang}</td>
                {
                  ['xem', 'them', 'sua', 'xoa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      {/* Kiểm tra chitietcn và chitietquyen trước khi truy cập thuộc tính */}
                      {chitietcn?.[vaiTro] === 1 ? (
                        <input
                          type="checkbox"
                          checked={chitietquyen?.[vaiTro] === 1 || false} // Nếu chitietquyen undefined, sẽ trả về false
                          onChange={(event) => {
                            let isChecked = event.target.checked ? 1 : 0;
                            setChiTietQuyenUpdate((prev) =>
                              prev.map((item) =>
                                item.ma_chuc_nang === chucnang.ma_chuc_nang
                                  ? { ...item, [vaiTro]: isChecked } // Cập nhật vai trò cụ thể
                                  : item // Giữ nguyên các mục khác
                              )
                            );
                          }}
                        />
                      ) : null}
                    </td>

                  ))
                }

              </tr>
              // <tr key={chucnang.ma_chuc_nang} className='text-center'>
              //   <td className='py-3 text-left pl-4'>{chucnang.ten_chuc_nang}</td>
              //   {['xem', 'them', 'sua', 'xoa'].map((vaiTro) => (
              //     <td key={vaiTro}>
              //       {chitietquyen && chitietquyen[vaiTro] !== 2 ? (
              //         <input
              //           type="checkbox"
              //           checked={chitietquyen[vaiTro] === 1}
              //           onChange={(event) => {
              //             let isChecked = event.target.checked ? 1 : 0; // Lấy giá trị 1 hoặc 0

              //             setChiTietQuyenUpdate((prev) => {
              //               // Kiểm tra xem chi tiết quyền cho chức năng này đã có chưa
              //               const index = prev.findIndex(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);

              //               if (index !== -1) {
              //                 // Nếu đã có chi tiết quyền thì chỉ cập nhật
              //                 const updatedList = [...prev];
              //                 updatedList[index] = {
              //                   ...updatedList[index],
              //                   [vaiTro]: isChecked, // Cập nhật giá trị của vai trò thành 0 hoặc 1
              //                 };
              //                 return updatedList;
              //               } else {
              //                 // Nếu chưa có chi tiết quyền, tạo mới với các giá trị mặc định
              //                 return [
              //                   ...prev,
              //                   {
              //                     ma_phan_quyen: currentQuyen,
              //                     ma_chuc_nang: chucnang.ma_chuc_nang,
              //                     xem: 1,
              //                     them: 0,
              //                     sua: 1,
              //                     xoa: 0, // Các giá trị mặc định cho các vai trò
              //                     [vaiTro]: isChecked // Cập nhật giá trị tương ứng với vai trò được thay đổi
              //                   }
              //                 ];
              //               }
              //             });
              //           }}
              //         />
              //       ) : null}
              //     </td>
              //   ))}
              // </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );





  const TableChitietquyenAdd = () => (
    <div>
      <table className='bg-[#1E1E1E] w-full h-full '>
        <thead>
          <tr className='border-b border-[#A4A298] text-[#A4A298] grid grid-cols-6 items-center'>
            <th className='py-2 col-span-2'>&nbsp;</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {chucnangList.map((chucnang) => {
            const chitietcn = chitietchucnang.find((item) => item.ma_chuc_nang == chucnang.ma_chuc_nang);
            const chitietquyen = chitietquyenAdd.find(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);
            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center grid grid-cols-6 items-center'>
                <td className='py-2 text-left col-span-2 '>{chucnang.ten_chuc_nang}</td>
                {
                  ['xem', 'them', 'sua', 'xoa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      {/* Kiểm tra chitietcn và chitietquyen trước khi truy cập thuộc tính */}
                      {chitietcn?.[vaiTro] === 1 ? (
                        <input
                          type="checkbox"
                          checked={chitietquyen?.[vaiTro] === 1 || false} // Nếu chitietquyen undefined, sẽ trả về false
                          onChange={(event) => {
                            let isChecked = event.target.checked ? 1 : 0;

                            setChitietquyenAdd((prev) =>
                              prev.map((item) =>
                                item.ma_chuc_nang === chucnang.ma_chuc_nang
                                  ? { ...item, [vaiTro]: isChecked } // Cập nhật vai trò cụ thể
                                  : item // Giữ nguyên các mục khác
                              )
                            );
                          }}
                        />
                      ) : null}
                    </td>

                  ))
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
          <tr className='border-b border-[#A4A298] text-[#A4A298] grid grid-cols-6 items-center'>
            <th className='py-3 col-span-2'>&nbsp;</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {chucnangList.map((chucnang) => {
            const chitietcn = chitietchucnang.find((item) => item.ma_chuc_nang == chucnang.ma_chuc_nang);
            const chitietquyen = filteredChitietquyenList.find(item => item.ma_chuc_nang === chucnang.ma_chuc_nang);
            return (
              <tr key={chucnang.ma_chuc_nang} className='text-center grid grid-cols-6 items-center'>
                <td className='py-3 text-left col-span-2 pl-2'>{chucnang.ten_chuc_nang}</td>
                {
                  ['xem', 'them', 'sua', 'xoa'].map((vaiTro) => (
                    <td key={vaiTro}>
                      {/* Kiểm tra chitietcn và chitietquyen trước khi truy cập thuộc tính */}
                      {chitietcn?.[vaiTro] === 1 ? (
                        <input
                          type="checkbox"
                          checked={chitietquyen?.[vaiTro] === 1 || false} // Nếu chitietquyen undefined, sẽ trả về false
                          readOnly
                        />
                      ) : null}
                    </td>

                  ))
                }

              </tr>
            )
          })
          }
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
    if (valueInputAdd == "") {
      setError('Tên quyền không để trống');
      flagExist = true;
    } else {
      quyenList.forEach((item) => {
        if (item.ten_quyen_han === valueInputAdd) {
          setError('Tên quyền đã tồn tại');
          flagExist = true;
          return;
        }
      });
    }

    if (!flagExist) {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
        content: 'Thêm quyền ',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk() {
          const timeCreated = getCurrentDateTime();
          //call api luu tru o day
          const valueSentAPI = {
            ten_quyen_han: valueInputAdd,   // Tên quyền hạn
            ngay_tao: timeCreated,          // Ngày tạo
            chi_tiet_phan_quyen: chitietquyenAdd  // Mảng chi tiết quyền hạn
          };
          createQuyen(valueSentAPI).then((data) => {
            let newQuyen = { ma_phan_quyen: data, ten_quyen_han: valueInputAdd, ngay_tao: timeCreated, tinh_trang: 1 };
            setQuyenList((prev) => [...prev, newQuyen]);
            setError("");
            setValueInputAdd("");
            setChitietquyenAdd([]);
            message.success('Thêm quyền thành công');
            handleAction(actionList.add_cancel);
          })
        },
        onCancel() {

        },
      });


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
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
        content: 'Cập nhật quyền ',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk() {
          const firstMaPhanQuyen = chitietquyenUpdate[0]?.ma_phan_quyen;
          valueInputAdd ? updateTenQuyenHan(firstMaPhanQuyen, valueInputAdd) : null;
          updatePhanQuyen(chitietquyenUpdate, filteredChitietquyenList);
          //
          setFilteredChitietquyenList(chitietquyenUpdate);
          if (valueInputAdd != '') {
            quyenList.find((item) => item.ma_phan_quyen === currentQuyen).ten_quyen_han = valueInputAdd;
          }
          setError("");
          setValueInputAdd("");
          setChiTietQuyenUpdate([]);
          handleAction(actionList.cancel_update);
        },
        onCancel() {

        },
      });


    }

  }

  function FormUpdate() {
    return (
      <div className='bg-[#1E1E1E] w-[50vw] h-auto'>
        <form className=" w-auto p-2">
          <div className="flex items-center gap-2">
            <p className='text-[#A4A298]'>Nhập tên quyền</p>
            <input
              value={valueInputAdd}
              onChange={(event) => setValueInputAdd(event.target.value)}
              className=" p-1 w-[300px] mt-3 outline-none bg-black mb-2 "
              type="text"
              placeholder={quyenList.find((item) => item.ma_phan_quyen == currentQuyen)?.ten_quyen_han}
              autoFocus
            />
          </div>
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
      <div className="bg-[#1E1E1E] w-[50vw] h-auto">
        <form
          className="w-auto p-2"
          onSubmit={(e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của form
            addQuyen(); // Gọi hàm xử lý
          }}
        >
          <div className="flex items-center gap-2">
            <p className="text-[#A4A298]">Nhập tên quyền</p>
            <input
              value={valueInputAdd}
              onChange={(event) => setValueInputAdd(event.target.value)}
              className="p-1 w-[300px] mt-3 outline-none bg-black mb-2"
              type="text"
              autoFocus
            />
          </div>
          <p className="text-[#EB2272] italic">{errorInputAdd}</p>
          <TableChitietquyenAdd />
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="bg-[#A4A298] p-1 pl-2 pr-2 text-[#1E1E1E]"
              type="button"
              onClick={() => {
                setChitietquyenAdd([]); // Reset chi tiết quyền
                setValueInputAdd(''); // Reset input
                setError(''); // Reset lỗi
                handleAction('');// Xử lý action
              }}
            >
              Hủy
            </button>
            <button
              className="bg-[#EB2272] p-1 pl-2 pr-2 text-black"
              type="submit" // Đổi type thành submit
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }




  useEffect(() => {
    // Lọc danh sách chi tiết quyền theo quyền hiện tại
    setIsGettingChitietquyenData(true);
    getChitietquyen(currentQuyen);
  }, [currentQuyen]);

  useEffect(() => {
    setBgCover(stateBgCover);
  }, [stateBgCover, setBgCover]);

  // kiểm tra quyền xem,them,sua,xoa

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const maPhanQuyen = 'AUTH0001'; // Thay bằng mã thực tế
        const maChucNang = 'FUNC0001'; // Thay bằng mã thực tế
        const result = await getFunctionalDetail(maPhanQuyen, maChucNang);
        console.log(result);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết phân quyền:', error);
      }
    };

    fetchDetails();
  }, []);
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
      {
        isGettingChitietquyenData ? <div className="wrap-loader"><span className="loader"></span></div> : <TableChitietquyen />
      }

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