import Cookies from "js-cookie";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

export default function getInstanceAxios(baseAPI: string) {
  const instance = axios.create({
    baseURL: baseAPI,
  });

  instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      const accessToken = Cookies.get("accessToken");

      if (!config.headers) {
        config.headers = new AxiosHeaders(); // Tạo instance của AxiosHeaders
      }

      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }

      config.headers.set("Accept", "application/json");
      config.headers.set("Content-Type", "application/json");

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      try {
        if (response.status !== 200) return Promise.reject(response.data);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    function (error) {
      if (error && error.response) {
        const { status } = error.response;
        if (status === 401) {
          console.log(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
