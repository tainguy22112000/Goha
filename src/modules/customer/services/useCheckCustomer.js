import request from "@/utils/request";
import { useMutation } from "react-query";

const useCheckCustomer = () =>
  useMutation(["customer"], async (payload) =>
    request.post(`customers/checkemail`, { ...payload })
  );

export default useCheckCustomer;
