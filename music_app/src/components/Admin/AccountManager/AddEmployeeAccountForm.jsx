import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";

const AddEmployeeAccountForm = ({ onAdd }) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title="Thêm tài khoản nhân viên"
        open={isModal} 
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên nhân viên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên nhân viên" }]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Vui lòng nhập đúng định dạng email" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Ngày tạo"
            name="createdDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày tạo" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Quyền"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
          >
            <Select placeholder="Chọn quyền">
              <Select.Option value={3}>Manager</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Thêm tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEmployeeAccountForm;
