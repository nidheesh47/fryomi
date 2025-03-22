import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance({
        url,
        params, // Pass the query parameters dynamically
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]); // Dependencies include URL and parameters

  return [data, isLoading, error,fetchData];
};

export default useFetch;
