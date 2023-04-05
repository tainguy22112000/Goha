import request from "@/utils/request";
import { useMutation } from "react-query";

const useUpdateOrder = (config) => {
  return useMutation(
    (payload) => request.put(`/orders/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useUpdateOrder;
