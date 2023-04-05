import request from "@/utils/request";
import { useMutation } from "react-query";

const useDeleteFlight = (config) => {
  return useMutation(
    (payload) => request.delete(`/flights/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useDeleteFlight;
