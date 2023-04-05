import React from "react";
import { Card, Col, Form, Input, Row, Select } from "antd";

export default function UserForm({
  form,
  initialValues = {},
  onSubmit,
  mode = "ADD",
  isLoading,
}) {
  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Row>
        <Col span={18} offset={3}>
          <Card loading={isLoading}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Role",
                    },
                  ]}
                >
                  <Select placeholder="Please input your Role!">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="agency">Agency</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid Email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: mode === "ADD" ? true : false,
                      message: "Please enter your Password",
                    },
                    {
                      min: 8,
                      message: "Password min 8 characters",
                    },
                    {
                      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                      message: `Password must contain at least 1 letter and 1 number`,
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: mode === "ADD" ? true : false,
                      message: "Please confirm your Password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Password not matched");
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
