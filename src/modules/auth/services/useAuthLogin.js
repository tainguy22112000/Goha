import { useMutation } from "react-query";
import request from "@/utils/request";
/**
 * Login with credentials
 * @param {Credentials} options
 */
const useAuthLogin = (options) =>
  useMutation(
    async ({ email, password }) =>
      request.post("/auth/login", { email, password }),
    {
      ...options,
      onSuccess: (r, ...rest) => {
        options && options.onSuccess(r, ...rest);
      },
    }
  );
export default useAuthLogin;
