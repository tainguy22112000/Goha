import request from "@/utils/request";
import { useMutation } from "react-query";

const useDeleteShipmentHistory = (config) => {
  return useMutation((data) => request.delete(`/shipmentHistory`, { data }), {
    ...config,
  });
};

export default useDeleteShipmentHistory;
