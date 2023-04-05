import { useQuery, useQueryClient } from "react-query";

import request from "@/utils/request";

const useGetCustomers = (params, option) =>
  useQuery(["customers", params], () => request.get(`customers`, { params }), {
    ...option,
  });

export function useInvalidateCustomer(params) {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["customers", params]);
}

export default useGetCustomers;
