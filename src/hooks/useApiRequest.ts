import { useState } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import apiClient from "../services/api/apiClient";
import useAuth from "./useAuth";

interface UseApiRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  code: number | null;
}

const useApiRequest = <RequestData = unknown, ResponseData = unknown>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" | "GET",
  customHeaders?: { [key: string]: string }
): [
  (data?: RequestData) => Promise<void>,
  UseApiRequestResult<ResponseData>,
] => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<number | null>(null);
  const { token } = useAuth();

  const executeRequest = async (requestData?: RequestData) => {
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
        case "GET":
          const serializedParams = new URLSearchParams();
          if (requestData) {
            Object.keys(requestData).forEach((key) => {
              const value = requestData[key as keyof RequestData];
              if (Array.isArray(value)) {
                value.forEach((v, index) => {
                  serializedParams.append(`${key}[${index}]`, v);
                });
              } else if (value !== null && value !== undefined) {
                serializedParams.append(key, value.toString());
              }
            });
          }
          response = await apiClient.get<ResponseData>(url, {
            params: serializedParams,
            cancelToken: source.token,
            headers,
          });
          break;
        case "POST":
          response = await apiClient.post<ResponseData>(url, requestData, {
            cancelToken: source.token,
            headers,
          });
          break;
        case "PATCH":
          response = await apiClient.patch<ResponseData>(url, requestData, {
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
        console.log("Yêu cầu bị hủy:", err.message);
      } else if (axios.isAxiosError(err) && err.response) {
        setCode(err.response.status);
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data)
        );
      } else {
        setCode(null);
        setError("Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  };

  return [executeRequest, { data, loading, error, code }];
};

export default useApiRequest;
