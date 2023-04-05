import { Col, Input, Row, Select } from "antd";

import { debounce } from "lodash";
import { useMemo } from "react";

const { Search } = Input;

const FilterListUser = ({ filters, onChange }) => {
  const onSearchChange = useMemo(
    () => debounce((val) => onChange({ ...filters, filter: val }), 300),
    [onChange, filters]
  );
  
  const onChangeStatus = (val) => onChange({ ...filters, role: val });

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Search
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Name, Email, Phone ..."
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
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="agency">Agency</Select.Option>
        </Select>
      </Col>
    </Row>
  );
};

export default FilterListUser;
