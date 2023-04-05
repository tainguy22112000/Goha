import axios from "axios";
import { parse, stringify } from "qs";

import history from "@/utils/history";
import { API_BASE_URL } from "@/configs/appConfig";
import { getToken, removeToken } from "./account";
import { displayErrorMessage } from "./message";

const request = axios.create({
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

/**
 * Intercept authorized request.
 */
export function createRequestInterceptor() {
  return function interceptor(config) {
    config.baseURL = API_BASE_URL;
    return {
      ...config,
      headers: {
        Accept: "application/json",
        "x-envoy-upstream-rq-timeout-ms": 30000,
        Authorization: `Bearer ${getToken()}`,
      },
    };
  };
}

export function getPathname(config) {
  const { url, baseURL } = config;
  if (baseURL) {
    return url.replace(baseURL, "");
  }
  return new URL(url).pathname;
}

export function notifyError(notifier, error) {
  const errorDetails = getErrorDetails(error);
  notifier(errorDetails);
}
/**
 * Notify error using Ant Design message.
 */
export function errorMessage(errorDetails) {
  // message.error(errorDetails);
  displayErrorMessage(errorDetails);
}
/**
 * Check if the given status is user error or not.
 */
export function isUserError({ response: { status } }) {
  return status >= 400 && status < 500;
}
/**
 * Check if the given status is server error or not.
 */
export function isServerError({ response: { status } }) {
  return status >= 500;
}
/**
 * Get error details from the error object.
 */
export function getErrorDetails(error) {
  let errorCode;
  let errorMessage = "";
  if (typeof error === "string") {
    errorCode = error;
  } else {
    const { response } = error;
    errorMessage = response && response.data && response.data.message;
    errorCode = error.code;
  }
  return `${errorCode}: ${errorMessage}`;
}
/**
 * Check if the error is unauthorized error.
 */
export function isUnauthorized(error) {
  const status = error && error.response && error.response.status;
  return status === 403 || status === 401;
}
/**
 * Check if the error is request error or not.
 */
export function isRequestError({ response, request }) {
  return !response && !!request;
}
/**
 * Check if the error is response error or not.
 */
export function isResponseError({ response }) {
  return !!response;
}
export function createHandlerChain(handlers = []) {
  return function handlerChain(error) {
    const stack = [...handlers];
    function next() {
      if (stack.length === 0) {
        return;
      }
      const nextHandler = stack.pop();
      nextHandler(error, next);
    }
    next();
    return Promise.reject(error);
  };
}

export function serverErrorHandler(error, next) {
  if (!isResponseError(error) || !isServerError(error)) {
    return next();
  }
  notifyError(errorMessage, error);
}

export function userErrorHandler(error, next) {
  if (!isResponseError(error) || !isUserError(error)) {
    return next();
  }
  notifyError(errorMessage, error);
}

export async function unauthorizedErrorHandler(error, next) {
  if (isUnauthorized(error)) {
    /**
     * TODO: Handle refresh token
     */
    errorMessage(getErrorDetails(error));
    removeToken();
    return;
  }
  next();
}
export function requestErrorHandler(error, next) {
  if (!isRequestError(error)) {
    return next();
  }
  errorMessage(getErrorDetails("request failed"));
}
export function otherErrorHandler(error, next) {
  if (
    isResponseError(error) ||
    isRequestError(error) ||
    isUnauthorized(error)
  ) {
    return next();
  }
  errorMessage(getErrorDetails("request failed"));
}

function maintenanceHandler(error, next) {
  const status = error?.response?.status;
  if (status !== 503) {
    return next();
  }
  return history.push("/503");
}

export function parseResultsHandler(response) {
  const { data, config } = response;
  if (config.parseResponse === false) {
    return response;
  }

  return data?.results || data;
}

request.interceptors.request.use(createRequestInterceptor());
request.interceptors.response.use(
  parseResultsHandler,
  createHandlerChain([
    serverErrorHandler,
    userErrorHandler,
    unauthorizedErrorHandler,
    requestErrorHandler,
    otherErrorHandler,
    maintenanceHandler,
  ])
);

// Default request instance
export default request;
