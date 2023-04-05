import request from "@/utils/request";
import { useMutation } from "react-query";

const useUpdateOrders = (config) => {
  return useMutation((payload) => request.put(`/orders`, { ...payload }), {
    ...config,
  });
};

export default useUpdateOrders;
