import { Col, Input, Row } from "antd";

import { debounce } from "lodash";
import { useMemo } from "react";

const { Search } = Input;

const FilterAgency = ({ filters, onChange }) => {
  const onSearchChange = useMemo(
    () => debounce((val) => onChange({ ...filters, filter: val }), 300),
    [onChange, filters]
  );

  return (
    <Row>
      <Col span={24}>
        <Search
          style={{ width: 350 }}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Name, Email, Phone ..."
        />
      </Col>
    </Row>
  );
};

export default FilterAgency;
