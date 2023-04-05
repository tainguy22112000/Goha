import { Tag } from "antd";
import { useMemo } from "react";

export const UserRole = ({ record }) => {
  const { role } = record;

  const RoleLabel = useMemo(() => {
    switch (role) {
      case "admin":
        return (
          <Tag color="#f50" key="admin">
            Admin
          </Tag>
        );
      case "user":
        return (
          <Tag color="#2db7f5" key="user">
            User
          </Tag>
        );
      case "agency":
        return (
          <Tag color="#87d068" key="agency">
            Agency
          </Tag>
        );
      default:
        return null;
    }
  }, [role]);

  return <>{RoleLabel}</>;
};
