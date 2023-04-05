import request from "@/utils/request";
import { useMutation } from "react-query";

const useCreateUser = (config) => {
  return useMutation((payload) => request.post("/users", { ...payload }), {
    ...config,
  });
};

export default useCreateUser;
