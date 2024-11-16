import { Button, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import AddEmployeeAccountForm from "./AddEmployeeAccountForm";
import { AdminContext } from "../../../context/AdminContext";
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
  console.log(accounts)
  const displayRole = (role) => {
    switch (role) {
      case 1:
        return "Người nghe";
      case 2:
        return "Nghệ sĩ";
      case 3:
        return "Manager";
      default:
        return "null";
    }
  };

  // Hàm chuyển đổi status từ mã sang tên hiển thị
  const displayStatus = (status) => {
    switch (status) {
      case 1:
        return "Chờ duyệt";
      case 2:
        return "Công khai";
      case 3:
        return "Khóa";
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

  const handleOkDelete = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account === selectedAccount ? { ...account, trang_thai: 0 } : account
      )
    );
    setIsModalVisible(false);
    setIsDeleteMode(false);
  };
  const handleAddClick = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  const handleOkEdit = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account === selectedAccount
          ? { ...account, role: editedRole, trang_thai: editedStatus }
          : account
      )
    );
    setIsModalVisible(false);
    setIsEditMode(false);
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
  //reset data
  const handleSearchAndReset = () => {
    setAccounts(applyFilters());
    setSearchTerm("");
    setFilterRole("All_role");
    setFilterStatus("All_status");
  };

  const applyFilters = () => {
    return accountsData.filter((account) => {
      const matchesSearchTerm = account.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        filterRole === "All_role" || displayRole(account.role) === filterRole;
      const matchesStatus =
        filterStatus === "All_status" ||
        displayStatus(account.trang_thai) === filterStatus;
      return matchesSearchTerm && matchesRole && matchesStatus;
    });
  };

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
              <option>Người nghe</option>
              <option>Nghệ sĩ</option>
              <option>Manager</option>
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
              <option>Chờ duyệt</option>
              <option>Công khai</option>
              <option>Khóa</option>
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
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer ${
                isEditMode ? "bg-[#E0066F]" : "bg-black"
              }`}
              onClick={handleEditClick}
            >
              <MdOutlineEdit size={20} />
            </div>
            <div
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full cursor-pointer ${
                isDeleteMode ? "bg-[#E0066F]" : "bg-black"
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
          <p className="mt-4">Tổng có: {accounts.length} tài khoản.</p>
          <div className="grid grid-cols-5 sm:grid-cols-[1fr_3fr_2fr_2fr_1.5fr_1.5fr_1fr] mt-2 p-4 text-[#fff]">
            <p className="text-[#E0066F]">#ID</p>
            <p className="text-[#E0066F]">Gmail</p>
            <p className="hidden sm:block text-[#E0066F]">Mật khẩu</p>
            <p className="text-[#E0066F]">Tên</p>
            <p className="text-[#E0066F]"> Ngày tạo</p>
            <p className="text-[#E0066F]">Quyền</p>
            <p className="text-[#E0066F]">Trạng thái</p>
          </div>
          <hr />
          <div className="h-[460px] overflow-y-auto">
            {accounts.map(
              (item, index) =>
                item.status !== 0 && (
                  <div
                    key={index}
                    className="grid grid-cols-5 sm:grid-cols-[1fr_3fr_2fr_2fr_1.5fr_1.5fr_1fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
                    onClick={() => handleAccountClick(item)}
                  >
                    <Link to="" className="text-white">
                      {index}
                    </Link>
                    <p className="text-[15px]">{item.email}</p>
                    <p className="text-[15px] hidden sm:block">
                      {maskPassword(item.mat_khau)}
                    </p>
                    <p className="text-[15px]">MCK</p>
                    <p className="text-[15px]">{item.ngay_tao}</p>
                    <p className="text-[15px]">
                      {displayRole(item.ma_phan_quyen)}
                    </p>
                    <p className="text-[15px]">
                      {displayStatus(item.trang_thai)}
                    </p>
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
              onChange={(e) => setEditedRole(parseInt(e.target.value))}
              className="w-full p-2 border rounded mb-4"
            >
              <option value={1}>Người nghe</option>
              <option value={2}>Nghệ sĩ</option>
              <option value={3}>Manager</option>
            </select>
            <label className="mt-2">Trạng thái:</label>
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={1}>Chờ duyệt</option>
              <option value={2}>Công khai</option>
              <option value={3}>Khóa</option>
            </select>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagerAccount;
