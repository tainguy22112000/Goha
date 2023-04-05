import request from "@/utils/request";
import { useQuery } from "react-query";

const useOrder = (id, option) =>
  useQuery(["order"], async () => request.get(`orders/${id}`), option);

export default useOrder;
