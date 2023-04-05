import request from "@/utils/request";
import { useMutation } from "react-query";

const useUpdateUser = (config) => {
  return useMutation(
    (payload) => request.put(`/users/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useUpdateUser;
