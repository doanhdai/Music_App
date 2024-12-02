import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import axios from "axios";

const AddEmployeeAccountForm = ({ isModal, onCancel, onAccountAdded }) => {
  const [form] = Form.useForm();
  const [permissions, setPermissions] = useState([]);
  const getPermissions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/decentralizations"
      );
      const filteredPermissions = response.data.filter(
        (item) =>
          item.ma_phan_quyen !== "AUTH0001" &&
          item.ma_phan_quyen !== "AUTH0002" &&
          item.ma_phan_quyen !== "AUTH0003"
      );
      setPermissions(filteredPermissions);
      console.log(permissions);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        Modal.error({
          title: "Lỗi",
          content: "Mật khẩu nhập lại không khớp!",
        });
        return;
      }
      const payload = {
        email: values.email,
        password: values.password,
        ten_user: values.name,
        decentralization: values.role,
      };
      const response = await axios.post(
        "http://localhost:8000/api/accounts/admin",
        payload
      );
      console.log(response.data)
      Modal.success({
        title: "Thành công",
        content: "Tài khoản đã được thêm thành công!",
      });
      form.resetFields(); // Reset form
      onCancel(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
      Modal.error({
        title: "Lỗi",
        content: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau!",
      });
    }
  };
  return (
    <Modal
      title={
        <span className="text-white flex justify-center">
          Thêm tài khoản nhân viên
        </span>
      }
      open={isModal}
      onCancel={onCancel}
      footer={null}
      centered
      className="custom-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-black text-white"
      >
        <Form.Item
          label={<span className="text-white">Tên nhân viên</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Vui lòng nhập đúng định dạng email" },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Mật khẩu</span>}
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password
            // placeholder="Nhập mật khẩu"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Nhập lại mật khẩu</span>}
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu" }]}
        >
          <Input.Password
            // placeholder="Nhập mật khẩu"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Quyền</span>}
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
        >
          <Select placeholder="Chọn quyền" className="custom-select">
            {permissions.map((item, index) => (
              <Select.Option
                index={index}
                className="custom-input"
                value={item.ma_phan_quyen}
              >
                {item.ten_quyen_han}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#E0066F] border-none"
          >
            Thêm tài khoản
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeAccountForm;
