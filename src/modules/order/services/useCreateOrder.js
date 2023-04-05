import request from "@/utils/request";
import { useMutation } from "react-query";

const useCreateOrder = (config) => {
  return useMutation((payload) => request.post("/orders", { ...payload }), {
    ...config,
  });
};

export default useCreateOrder;
