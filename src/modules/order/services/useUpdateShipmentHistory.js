import request from "@/utils/request";
import { useMutation } from "react-query";

const useUpdateShipmentHistory = (config) => {
  return useMutation(
    (payload) => request.post(`/shipmentHistory`, { ...payload }),
    {
      ...config,
    }
  );
};

export default useUpdateShipmentHistory;
