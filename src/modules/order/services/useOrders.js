import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useOrders = (params, option) =>
  useQuery(["orders", params], () => request.get(`orders`, { params }), {
    ...option,
  });

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["orders"]);
}

export default useOrders;
