import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

const Loading = (props) => {
  const { align, cover } = props;
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

export default Loading;
