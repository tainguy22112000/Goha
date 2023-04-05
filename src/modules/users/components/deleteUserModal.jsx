import { Modal } from "antd";
import React from "react";
import useDeleteUser from "../services/useDeleteUser";
import { useInvalidateUser } from "../services/useGetUsers";

const DeleteUserModal = ({ userId, name, closeModal, ...restProps }) => {
  const invalidateOrder = useInvalidateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(
      { id: userId },
      {
        onSuccess: async () => {
          await invalidateOrder();
          await closeModal();
        },
      }
    );
  };

  return (
    <Modal
      {...restProps}
      title={`Are you sure delete`}
      onOk={handleDelete}
      onCancel={closeModal}
    >
      <p>
        Name: <b>${name}</b>
      </p>
    </Modal>
  );
};

export default DeleteUserModal;
