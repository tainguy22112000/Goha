import { Modal } from 'antd';
import React from 'react';
import useDeleteOrder from '../services/useDeleteOrder';
import useDeleteShipmentHistory from '../services/useDeleteShipmentHistory';
import { useInvalidateOrder } from '../services/useOrders';

const DeleteOrderModal = ({ orderId, closeModal, ...restProps }) => {
	const { mutate: deleteOrder } = useDeleteOrder();
	const invalidateOrder = useInvalidateOrder();
	const { mutateAsync: deleteShipmentHistory } = useDeleteShipmentHistory();

	const handleDelete = () => {
		deleteOrder(
			{ id: orderId },
			{
				onSuccess: async () => {
					await invalidateOrder();
					await deleteShipmentHistory({ orderId });
					await closeModal();
				},
			}
		);
	};

	return (
		<Modal {...restProps} onOk={handleDelete} okText="Delete">
			<h4>Are you sure delete ?</h4>
		</Modal>
	);
};

export default DeleteOrderModal;
