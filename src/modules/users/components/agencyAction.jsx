import { Button, Space, Tooltip } from "antd";
import {
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import DeleteUserModal from "./deleteUserModal";
import React from "react";
import { useNavigate } from "react-router";
import useModal from "@/hooks/useModal";

const AgencyAction = ({ record }) => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const onRemove = (id) => {
    return openModal(DeleteUserModal, {
      userId: id,
      closeModal,
      name: record?.name,
    });
  };

  const onEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const onViewOrderUser = (id) => {
    navigate(`/order-user/${id}`);
  };

  return (
    <Space align="end" size="middle">
      <Tooltip title="Update user">
        <Button
          shape="circle"
          onClick={() => onEdit(record?.id)}
          icon={<EditOutlined />}
        />
      </Tooltip>

      <Tooltip title="Delete user">
        <Button
          onClick={() => onRemove(record?.id)}
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Tooltip>

      <Tooltip title="View Order">
        <Button
          onClick={() => onViewOrderUser(record?.id)}
          shape="circle"
          icon={<AreaChartOutlined />}
        />
      </Tooltip>
    </Space>
  );
};

export default AgencyAction;
