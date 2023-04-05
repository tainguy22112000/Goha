import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useUserOrders = (params, option) =>
  useQuery(
    ["order-user", params],
    () => request.get(`/orders/order-user/${params}`),
    {
      ...option,
    }
  );

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["order-user"]);
}

export default useUserOrders;
