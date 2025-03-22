import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance({ url, params });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  return [data, isLoading, error, fetchData];
};


export default useFetch;
