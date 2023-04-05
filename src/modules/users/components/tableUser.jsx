import { Table } from "antd";
import React from "react";

export default function TableUser({
  tableColumns,
  dataSource,
  onChange,
  isLoading,
  ...props
}) {
  return (
    <Table
      columns={tableColumns}
      dataSource={dataSource}
      onChange={onChange}
      loading={isLoading}
      rowKey="id"
      {...props}
    />
  );
}
