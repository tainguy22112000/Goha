import { Button, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import DeleteUserModal from "./deleteUserModal";
import React from "react";
import { useNavigate } from "react-router";
import useModal from "@/hooks/useModal";

const UserActions = ({ record }) => {
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
    </Space>
  );
};

export default UserActions;
