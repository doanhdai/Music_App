import { Button, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import AddEmployeeAccountForm from "./AddEmployeeAccountForm";
import { AdminContext } from "../../../context/AdminContext";
import { formatDate, removeVietnamese } from "../../../utils";
import { assets } from "../../../assets/assets";
import axios from "axios";
const ManagerAccount = () => {
  const { accountsData } = useContext(AdminContext);

  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [editedRole, setEditedRole] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All_role");
  const [filterStatus, setFilterStatus] = useState("All_status");

  const maskPassword = (password) => "*".repeat(password.length);
  useEffect(() => {
    setAccounts(accountsData);
  }, [accountsData]);
  //hiển thị trạng thái
  const displayStatus = (status) => {
    switch (status) {
      case 0:
        return "bị khóa";
      case 1:
        return "hoạt động";
      default:
        return "";
    }
  };

  const showDeleteConfirm = (account) => {
    setSelectedAccount(account);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (isDeleteMode) {
      handleOkDelete();
    } else if (isEditMode) {
      handleOkEdit();
    }
  };

  const handleOkDelete = async () => {
    const { ma_tk } = selectedAccount;
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/accounts/${ma_tk}`,
        {
          trang_thai: 2,
        }
      );
      console.log("Cập nhật trạng thái tài khoản thành công:", response.data);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.ma_tk !== ma_tk)
      );

      setIsModalVisible(false);
      setIsDeleteMode(false);
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      alert("Không thể xóa tài khoản. Vui lòng thử lại.");
    }
  };

  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  //hàm sử lí khi sửa tài khoản
  const handleOkEdit = async () => {
    const { ma_tk } = selectedAccount;
    let updatedAccount = { ...selectedAccount };
    let isUpdated = false;

    try {
      // Kiểm tra và cập nhật quyền hạn
      if (
        editedRole !== selectedAccount.phan_quyen.ma_phan_quyen &&
        editedRole !== ""
      ) {
        if (
          selectedAccount.phan_quyen.ma_phan_quyen === "AUTH0002" &&
          editedRole === "AUTH0003"
        ) {
          console.error("Không thể chuyển quyền từ Nghệ sĩ về Người nghe.");
          alert("Không thể chuyển quyền từ Nghệ sĩ về Người nghe.");
          return;
        }

        if (editedRole === "AUTH0002") {
          const resRole = await axios.patch(
            `http://localhost:8000/api/accounts/${ma_tk}/toartist`
          );
          console.log("Cập nhật quyền hạn thành công:", resRole.data);
          updatedAccount = {
            ...updatedAccount,
            phan_quyen: { ma_phan_quyen: "AUTH0002", ten_quyen_han: "Nghệ sĩ" },
          };
          isUpdated = true;
        }
      }

      // Kiểm tra và cập nhật trạng thái
      if (editedStatus !== selectedAccount.trang_thai && editedStatus !== "") {
        const resStatus = await axios.patch(
          `http://localhost:8000/api/accounts/${ma_tk}`,
          {
            trang_thai: editedStatus,
          }
        );
        console.log("Cập nhật trạng thái thành công:", resStatus.data);
        updatedAccount = {
          ...updatedAccount,
          trang_thai: editedStatus,
        };
        isUpdated = true;
      }

      if (isUpdated) {
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account.ma_tk === ma_tk ? updatedAccount : account
          )
        );
        console.log("Cập nhật tài khoản thành công:", updatedAccount);
      } else {
        console.log("Không có thay đổi nào cần cập nhật.");
      }

      setIsModalVisible(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDeleteMode(false);
    setIsEditMode(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteMode(true);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setIsDeleteMode(false);
  };

  const handleAccountClick = (account) => {
    if (isDeleteMode) {
      showDeleteConfirm(account);
    } else if (isEditMode) {
      setSelectedAccount(account);
      setEditedRole(account.role);
      setEditedStatus(account.trang_thai);
      setIsModalVisible(true);
    }
  };
  const handleSearchAndReset = () => {
    setAccounts(applyFilters());
    setSearchTerm("");
    setFilterRole("All_role");
    setFilterStatus("All_status");
  };

  const applyFilters = () => {
    return accountsData.filter((account) => {
      const matchesSearchTerm =
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        removeVietnamese(account.user.ten_user)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        account.ma_tk.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole =
        filterRole === "All_role" ||
        account.phan_quyen.ma_phan_quyen === filterRole;
      const matchesStatus =
        filterStatus === "All_status" ||
        account.trang_thai.toString() === filterStatus;
      return matchesSearchTerm && matchesRole && matchesStatus;
    });
  };
  const updateAccountToArtist = async (ma_tk) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/accounts/${ma_tk}/toartist`
      );
      console.log("Cập nhật quyền hạn thành công:", res.data);

      // Cập nhật danh sách tài khoản
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.ma_tk === ma_tk
            ? {
              ...account,
              phan_quyen: {
                ...account.phan_quyen,
                ma_phan_quyen: "AUTH0002",
                ten_quyen_han: "Nghệ sĩ",
              },
            }
            : account
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật quyền hạn:", error);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setEditedRole("");
      setEditedStatus("");
    }
  }, [isModalVisible]);
  return (
    <div className="pt-3 mx-[38px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col">
            <label className="mb-1">Tìm kiếm tài khoản</label>
            <div className="flex items-center p-2 w-[300px] bg-black justify-between rounded-3xl">
              <IoIosSearch className="text-white text-2xl cursor-pointer" />
              <input
                className="bg-black w-[100%] outline-none ml-3 text-white"
                type="text"
                placeholder="Tìm kiếm theo email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Loại người dùng</label>
            <select
              className="bg-black text-white p-2 rounded-3xl border-none w-[200px] outline-none cursor-pointer"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All_role">Tất cả người dùng</option>
              <option value="AUTH0003">Người nghe</option>
              <option value="AUTH0002">Nghệ sĩ</option>
              <option value="AUTH0001">Manager</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Trạng thái</label>
            <select
              className="bg-black text-white p-2 rounded-3xl border-none w-[170px] outline-none cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All_status">Tất cả</option>
              <option value="1">Hoạt động</option>
              <option value="0">Khóa</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">&nbsp;</label>
            <button
              type="primary"
              className="rounded-3xl bg-[#E0066F] h-[36px] w-[100px] hover:!bg-[#E0066F]"
              onClick={handleSearchAndReset}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-2">&nbsp;</label>
          <div className="flex space-x-5">
            <div
              onClick={handleAddClick}
              className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black"
            >
              <CiCirclePlus size={20} />
            </div>
            <div
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer ${isEditMode ? "bg-[#E0066F]" : "bg-black"
                }`}
              onClick={handleEditClick}
            >
              <MdOutlineEdit size={20} />
            </div>
            <div
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer ${isDeleteMode ? "bg-[#E0066F]" : "bg-black"
                }`}
              onClick={handleDeleteClick}
            >
              <MdDeleteOutline size={20} />
            </div>
          </div>
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="flex items-center h-[500px] justify-center text-center text-white">
          Không có tài khoản bạn tìm
        </div>
      ) : (
        <div>
          {/* <p className="mt-4">Tổng có: {accounts.length} tài khoản.</p> */}
          <div className="grid grid-cols-5 sm:grid-cols-[1fr_3fr_2.5fr_2fr_1.5fr_1fr_0.7fr] mt-2 p-4 text-[#fff]">
            <p className="text-[#E0066F] text-sm">#ID</p>
            <p className="text-[#E0066F] text-sm">Tên người dùng</p>
            <p className="text-[#E0066F] text-sm">Gmail</p>
            <p className="hidden sm:block text-sm text-[#E0066F]">Mật khẩu</p>
            <p className="text-[#E0066F] text-sm"> Ngày tạo</p>
            <p className="text-[#E0066F] text-sm">Quyền</p>
            <p className="text-[#E0066F] text-sm">Trạng thái</p>
          </div>
          <hr />
          <div className="h-[460px] overflow-y-auto">
            {accounts.map(
              (item, index) =>
                item.status !== 0 && (
                  <div
                    key={index}
                    className="grid grid-cols-5 sm:grid-cols-[1fr_3fr_2.5fr_2fr_1.5fr_1fr_0.7fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
                    onClick={() => handleAccountClick(item)}
                  >
                    <Link to="" className="text-white">
                      {item.ma_tk.length > 7
                        ? `${item.ma_tk.slice(0, 7)}...`
                        : item.ma_tk}
                    </Link>
                    <p className="text-sm flex items-center">
                      <img className="h-9 rounded-full mr-2" src={assets.mck} />
                      {item.user.ten_user}
                    </p>
                    <p className="text-sm">{item.email}</p>
                    <p className="text-sm hidden sm:block">
                      {maskPassword(item.mat_khau)}
                    </p>

                    <p className="text-sm">{formatDate(item.ngay_tao)}</p>
                    <p className="text-sm">{item.phan_quyen.ten_quyen_han}</p>
                    <p className="text-sm">{displayStatus(item.trang_thai)}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <AddEmployeeAccountForm
        isModal={isAddModalVisible}
        onCancel={handleAddCancel}
      />
      <Modal
        title={isDeleteMode ? "Xác nhận xóa" : "Chỉnh sửa tài khoản"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Hủy"
        centered
      >
        {isDeleteMode ? (
          <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
        ) : (
          <div>
            <label>Quyền:</label>
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Chọn quyền</option>
              <option value="AUTH0003">Người nghe</option>
              <option value="AUTH0002">Nghệ sĩ</option>
            </select>
            <label className="mt-2">Trạng thái:</label>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value="">Chọn trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Khóa</option>
            </select>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagerAccount;
