import { Col, Input, Row, Select } from "antd";

import { OrderStatus } from "../services/orderService";
import { debounce } from "lodash";
import { useMemo } from "react";

const FilterListOrder = ({ filters, onChange }) => {
  const onSearchChange = useMemo(
    () => debounce((val) => onChange({ ...filters, filter: val }), 300),
    [onChange, filters]
  );
  const onChangeStatus = (val) => onChange({ ...filters, status: val });

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Input.Search
          style={{ width: "100%" }}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Name, Email, Phone Code, Flight No ..."
        />
      </Col>
      <Col span={8}>
        <Select
          onChange={(val) => onChangeStatus(val)}
          style={{ width: 220 }}
          placeholder="Please select Status"
          value={filters?.status}
          allowClear
        >
          <Select.Option value={OrderStatus.PACKAGED}>Packaged</Select.Option>
          <Select.Option value={OrderStatus.SHIPPING}>Shipping</Select.Option>
          <Select.Option value={OrderStatus.TOVIETNAM}>
            To VietNam
          </Select.Option>
          <Select.Option value={OrderStatus.REVEIVED}>Reveived</Select.Option>
          <Select.Option value={OrderStatus.CANCELED}>Canceled</Select.Option>
        </Select>
      </Col>
    </Row>
  );
};

export default FilterListOrder;
