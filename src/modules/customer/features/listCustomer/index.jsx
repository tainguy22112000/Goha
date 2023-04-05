import { Button, Card } from "antd";
import React from "react";
import moment from "moment";
import TableUser from "@/modules/users/components/tableUser";
import useReflectionSearchParams from "@/hooks/useReflectionSearchParams";
import useGetUsers from "../../services/useGetUsers";
import { UserRole } from "../../components/labelUserRole";
import UserActions from "../../components/userAction";
import FilterListUser from "../../components/filterListUser";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    render: (_, record) => <UserRole record={record} />,
  },
  {
    title: "Date",
    sorter: true,
    dataIndex: "createdAt",
    render: (_, record) => moment(record?.createdAt).format("DD/MM/YYYY"),
  },
  {
    title: "Actions",
    render: (_, record) => <UserActions record={record} />,
  },
];

export default function ListUser() {
  const navigate = useNavigate();
  const [{ page, limit, sortBy, filters }, setSearchParams] =
    useReflectionSearchParams({
      page: 0,
      limit: 20,
      sortBy: "desc",
    });

  const { data, isLoading } = useGetUsers({
    page,
    limit,
    sortBy,
    ...filters,
  });

  const changeTable = (pagination) => {
    setSearchParams({
      page: pagination.current - 1,
      limit: pagination.pageSize,
    });
  };

  const changeFilter = (f) => {
    setSearchParams({
      filters: f,
      page: 0,
    });
  };

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <div className="flex p-3 justify-between">
        <FilterListUser filters={filters} onChange={changeFilter} />
        <div className="flex justify-between">
          <Button
            onClick={() => {
              navigate(`/users/add`);
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add user
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <TableUser
          tableColumns={columns}
          dataSource={data}
          loading={isLoading}
          onChange={changeTable}
        />
      </div>
    </Card>
  );
}
