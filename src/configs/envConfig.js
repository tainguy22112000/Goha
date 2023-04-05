const dev = {
  API_ENDPOINT_URL: "https://goha-api.vercel.app/v1/",
};

const prod = {
  API_ENDPOINT_URL: "https://goha-api.vercel.app/v1/",
};

const test = {
  API_ENDPOINT_URL: "https://goha-api.vercel.app/v1/",
};

const getEnv = () => {
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv();
