import { AutoComplete, Col, Form, Input, Row } from "antd";
import { useMemo, useState } from "react";

import { debounce } from "lodash";
import { getUser } from "@/utils/account";
import useGetCustomers from "@/modules/customer/services/useGetCustomers";
import useFlights from "@/modules/flight/services/useFlights";

const ShipperFormPart = ({ form, next }) => {
  const user = getUser();
  const [value, setValue] = useState({ userId: user?.id });

  const { data: dataCustomer } = useGetCustomers(value);
  const { data: dataFlight } = useFlights(value);

  const parseDataCustomer = () =>
    dataCustomer?.map((item) => ({
      ...item,
      value: item.email,
    }));

  const onSelectCustomer = (value) => {
    const item = dataCustomer?.find((item) => item.email === value);
    if (item) {
      form.setFieldsValue({
        fullName_ship: item.fullname,
        phone_ship: item.phone,
      });
    }
  };

  const parseDataFlight = () =>
    dataFlight?.map((item) => ({
      ...item,
      value: item?.code,
    }));

  const onSelectFlight = (value) => {
    const item = dataFlight?.find((item) => item.code === value);
    if (item) {
      form.setFieldsValue({
        flightCode: item.code,
      });
    }
  };

  const onSearchFlight = useMemo(
    () =>
      debounce(async (val) => {
        setValue({
          ...value,
          filter: val,
        });
      }, 300),
    [setValue, value]
  );

  return (
    <Row gutter={16}>
      <Col span={11} offset={1}>
        <Form.Item
          label="Email"
          name="email_ship"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-Mail!",
            },
            {
              required: true,
              message: "Please input your E-Mail!",
            },
          ]}
        >
          <AutoComplete
            options={parseDataCustomer()}
            onSelect={onSelectCustomer}
            onSearch={onSelectCustomer}
            placeholder="Enter email here..."
          />
        </Form.Item>
        <Form.Item
          label="Flight No"
          name="flightNo"
          rules={[
            {
              required: true,
              message: "Please input your flight code!",
            },
          ]}
        >
          <AutoComplete
            options={parseDataFlight()}
            onSelect={onSelectFlight}
            onSearch={onSelectFlight}
            placeholder="Enter code here..."
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your Address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone_ship"
          rules={[
            {
              required: true,
              message: "Please input your Phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={11} offset={1}>
        <Form.Item
          label="Full Name"
          name="fullName_ship"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Package Number"
          name="packageNumber"
          rules={[
            {
              required: true,
              message: "Please input your Package Number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Package Description"
          name="packageDescription"
          rules={[
            {
              required: true,
              message: "Please input your Package Description!",
            },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ShipperFormPart;
