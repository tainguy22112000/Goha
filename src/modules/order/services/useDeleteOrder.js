import request from "@/utils/request";
import { useMutation } from "react-query";

const useDeleteOrder = (config) => {
  return useMutation(
    (payload) => request.delete(`/orders/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useDeleteOrder;
