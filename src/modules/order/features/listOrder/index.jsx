import { Button, Card } from "antd";
import React from "react";
import useReflectionSearchParams from "@/hooks/useReflectionSearchParams";
import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import useOrders from "../../services/useOrders";
import { useAuth } from "@/hooks/useAuth";
import OrderTable from "../../components/tableOrder";
import FilterListOrder from "../../components/filterListOrder";

export default function ListOrder() {
  const navigate = useNavigate();
  const [{ page, limit, sortBy, filters }, setSearchParams] =
    useReflectionSearchParams({
      page: 0,
      limit: 20,
      sortBy: "desc",
    });
  const { profile } = useAuth();

  const params = {
    page,
    limit,
    sortBy,
    ...filters,
  };

  const { data, isLoading } = useOrders(
    profile?.role === "admin" ? params : { ...params, userId: profile.id }
  );

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
        <div style={{ width: "70%" }}>
          <FilterListOrder filters={filters} onChange={changeFilter} />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => {
              navigate(`/orders/add`);
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add order
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <OrderTable data={data} loading={isLoading} onChange={changeTable} />
      </div>
    </Card>
  );
}
