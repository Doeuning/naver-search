import axios from "axios";
// import { setInterceptors } from "./interceptors";

const client_id = "FSyHYM0S3JX6DSx13tCi";
const client_secret = "Tf8NaTcLxU";

function createWithAuth(options) {
  const baseUrl =`${process.env.REACT_APP_API_URL}/v1/search/`;
  const instance = axios.create(
    Object.assign(
      {
        baseURL: baseUrl,
        timeout: 0,
        responseEncoding: "utf8",
      },
      {
        ...options,
      },
      {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      }
    )
  );
  // setInterceptors(instance);
  return instance;
}

export const instance = createWithAuth();
