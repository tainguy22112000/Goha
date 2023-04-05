import request from "@/utils/request";
import { useMutation } from "react-query";

const useUpdateFlight = (config) => {
  return useMutation(
    (payload) => request.put(`/flights/${payload.id}`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useUpdateFlight;
