import request from "@/utils/request";
import { useMutation } from "react-query";

const useDeleteUser = (config) => {
  return useMutation(
    (payload) => request.delete(`/users/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useDeleteUser;
