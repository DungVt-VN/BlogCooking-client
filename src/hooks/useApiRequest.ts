import { useState } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
// import useAuth from "./useAuth";
import apiClient from "../services/api/apiClient";

interface UseApiRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  code: number | null;
}

const useApiRequest = <RequestData = unknown, ResponseData = unknown>(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  customHeaders?: { [key: string]: string }
): [
  (data: RequestData) => Promise<void>,
  UseApiRequestResult<ResponseData>,
] => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);
  // const { token } = useAuth();
  const token =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI0IiwiZW1haWwiOiJkdXl0aHV5MTBjQGdtYWlsLmNvbSIsIm5iZiI6MTcyNzQ3MzM3MiwiZXhwIjoxNzI3NDc1MTcyLCJpYXQiOjE3Mjc0NzMzNzJ9.KaKj-yB6oS7cIFUlgfKWyga-KApwaraHSJ4uYf6Hu24OBGLcw4tRuoLXAcbH8HTuiKesKYjQ-_hpQE51TaUtAQ";

  const executeRequest = async (requestData: RequestData) => {
    const source: CancelTokenSource = axios.CancelToken.source();

    setLoading(true);
    setError(null);

    try {
      let response: AxiosResponse<ResponseData>;
      const headers: { [key: string]: string } = { ...customHeaders };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      switch (method) {
        case "POST":
          response = await apiClient.post<ResponseData>(url, requestData, {
            cancelToken: source.token,
            headers,
          });
          break;
        case "PUT":
          response = await apiClient.put<ResponseData>(url, requestData, {
            cancelToken: source.token,
            headers,
          });
          break;
        case "DELETE":
          response = await apiClient.delete<ResponseData>(url, {
            data: requestData,
            cancelToken: source.token,
            headers,
          });
          break;
        default:
          throw new Error("Phương thức không hợp lệ");
      }

      setCode(response.status);
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Yêu cầu bị hủy", err.message);
      } else {
        if (axios.isAxiosError(err) && err.response) {
          setCode(err.response.status);
          setError(err.response.data);
        } else {
          setCode(null);
          setError("Failed to fetch data");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return [executeRequest, { data, loading, error, code }];
};

export default useApiRequest;
