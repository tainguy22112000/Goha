import { OrderStatus } from "../services";
import { Tag } from "antd";
import { useMemo } from "react";

const colorStatus = {
  CANCELED: "#cf1322",
  PACKAGED: "#333333",
  REVEIVED: "#389e0d",
  SHIPPING: "#108ee9",
  TOVIETNAM: "purple",
};

export const LabelOrderStatus = ({ status }) => {
  const StatusLabel = useMemo(() => {
    switch (status) {
      case OrderStatus.CANCELED:
        return (
          <Tag color={colorStatus.CANCELED} key={status}>
            Canceled
          </Tag>
        );
      case OrderStatus.PACKAGED:
        return (
          <Tag color={colorStatus.PACKAGED} key={status}>
            Packaged
          </Tag>
        );
      case OrderStatus.REVEIVED:
        return (
          <Tag color={colorStatus.REVEIVED} key={status}>
            Reveived
          </Tag>
        );
      case OrderStatus.TOVIETNAM:
        return (
          <Tag color={colorStatus.TOVIETNAM} key={status}>
            To Viet Nam
          </Tag>
        );
      case OrderStatus.SHIPPING:
        return (
          <Tag color={`${colorStatus.SHIPPING}`} key={status}>
            Shipping
          </Tag>
        );
      default:
        return null;
    }
  }, [status]);

  return <>{StatusLabel}</>;
};
