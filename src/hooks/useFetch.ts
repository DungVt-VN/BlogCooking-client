import { useState, useEffect } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import useAuth from "./useAuth";
import apiClient from "../services/api/apiClient";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = unknown, T2 = unknown>(
  url: string,
  params?: T2 | null
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const source: CancelTokenSource = axios.CancelToken.source();

    const serializedParams = new URLSearchParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof T2];
        if (Array.isArray(value)) {
          value.forEach((v, index) => {
            serializedParams.append(`${key}[${index}]`, v);
          });
        } else if (value !== null && value !== undefined) {
          serializedParams.append(key, value.toString());
        }
      });
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers: { [key: string]: string } = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response: AxiosResponse<T> = await apiClient.get<T>(url, {
          params: serializedParams,
          paramsSerializer: (params) => new URLSearchParams(params).toString(),
          cancelToken: source.token,
          headers,
        });

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else if (isMounted) {
          setError("Failed to fetch data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      source.cancel("Operation canceled by the user.");
    };
  }, [url, token, params]);

  return { data, loading, error };
};

export default useFetch;
