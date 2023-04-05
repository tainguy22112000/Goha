import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useGetOrderFlight = (params, option) =>
  useQuery(
    ["order-flight", params],
    () => request.get(`/orders/order-flight`, { params }),
    {
      ...option,
    }
  );

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["order-flight"]);
}

export default useGetOrderFlight;
