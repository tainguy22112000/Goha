import { Button, Space, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import OrderActions from "./orderActions";
// import StatusAllShipmentModal from "@/modules/shipment/components/statusAllShipmentModal";
import { LabelOrderStatus } from "./labelOrderStatus";
import useModal from "@/hooks/useModal";
import { useAuth } from "@/hooks/useAuth";

const OrderTable = ({ data, loading, onChange, ...props }) => {
  const navigate = useNavigate();
  // const { openModal, closeModal } = useModal();
  const { hasRoles } = useAuth();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName_ship",
      sorter: true,
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Flight No",
      dataIndex: "flightNo",
      render: (_, record) => (
        <Button
          onClick={() => navigate(`/order-flight/${record?.flightNo}`)}
          type="link"
        >
          {record?.flightNo}
        </Button>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone_ship",
    },
    {
      title: "Email",
      dataIndex: "email_ship",
    },
    {
      title: "Date",
      sorter: true,
      dataIndex: "createdAt",
      render: (_, record) => moment(record?.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (_, record) => <LabelOrderStatus status={record.status} />,
    },
    {
      title: "Actions",
      render: (_, record) => <OrderActions record={record} />,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onUpdateStatus = () => {
    // return openModal(StatusAllShipmentModal, {
    //   ids: selectedRowKeys,
    //   closeModal,
    // });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Space>
        <p>
          {hasSelected ? (
            <>
              <span>{`Selected ${selectedRowKeys.length} items: `}</span>
              {hasRoles(["admin", "user"]) && (
                <Button
                  type="primary"
                  disabled={!hasSelected}
                  onClick={() => onUpdateStatus()}
                >
                  Update All
                </Button>
              )}
            </>
          ) : (
            ""
          )}
        </p>
      </Space>
      <Table
        scroll={{
          x: 1300,
        }}
        {...props}
        rowSelection={rowSelection}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        loading={loading}
        onChange={onChange}
      />
    </>
  );
};

export default OrderTable;
