import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";

const AddEmployeeAccountForm = ({ isModal, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    onCancel(); 
  };

  return (
    <Modal
      title={<span className="text-white flex justify-center">Thêm tài khoản nhân viên</span>}
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
            <Select.Option className="custom-input" value={3}>
              Manager
            </Select.Option>
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
