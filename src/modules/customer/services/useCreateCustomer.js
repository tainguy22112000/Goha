import request from "@/utils/request";
import { useMutation } from "react-query";

const useCreateCustomer = (config) => {
  return useMutation((payload) => request.post("/customers", { ...payload }), {
    ...config,
  });
};

export default useCreateCustomer;
