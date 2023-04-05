import request from "@/utils/request";
import { useMutation } from "react-query";

const useCreateFlight = (config) => {
  return useMutation((payload) => request.post("/flights", { ...payload }), {
    ...config,
  });
};

export default useCreateFlight;
