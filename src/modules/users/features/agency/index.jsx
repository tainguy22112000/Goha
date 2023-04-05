import { Card } from "antd";
import React from "react";
import moment from "moment";
import TableUser from "@/modules/users/components/tableUser";
import useReflectionSearchParams from "@/hooks/useReflectionSearchParams";
import useGetUsers from "../../services/useGetUsers";
import { UserRole } from "../../components/labelUserRole";
import FilterAgency from "../../components/filterAgency";
import AgencyAction from "../../components/agencyAction";

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
    render: (_, record) => <AgencyAction record={record} />,
  },
];

export default function Agency() {
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
    role: "agency",
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
        <FilterAgency filters={filters} onChange={changeFilter} />
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
