import Cookies from "js-cookie";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { ENVIROMENT } from "../../environment/enviroment";

export default function getInstanceAxios(baseAPI: string) {
  const instance = axios.create({
    baseURL: baseAPI,
  });

  instance.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig) {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if(config.url?.endsWith('account/refesh-token')){
        return config;
      }else 
      
      if(refreshToken && accessToken){
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        config.headers.set("Authorization", `Bearer ${accessToken}`);
        config.headers.set("Accept", "application/json");
        config.headers.set("Content-Type", "application/json");

        return config;
      }else 
      
      if(refreshToken && !accessToken){
        try {
          // Gửi yêu cầu để lấy access token mới
          const response = await axios.post(ENVIROMENT.BASE_API+'api/account/refresh', { refreshToken: refreshToken });
          const newAccessToken = response.data.accessToken; // Giả sử access token mới được trả về
          const now = new Date();
          now.setHours(now.getHours() + 1)
          Cookies.set("accessToken",newAccessToken,{expires:now})

          config.headers['Authorization'] = `Bearer ${newAccessToken}`; // Cập nhật headers

          return config;
        } catch (error) {
          console.error('Refresh token failed:', error);
          return Promise.reject(error);
        }
      }

      else{
        if(accessToken){
          Cookies.remove("accessToken")
        }
        return config;
      }
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
