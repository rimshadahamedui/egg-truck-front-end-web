import React, { useEffect, useState } from "react";
import axiosInstance, { axiosPublicInstance } from "../utils/api/axiosInstance";

export default function useFetchApi({
  url,
  isProtectedApi = true,
  currentPage = 1,
}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let instance = axiosInstance;
      !isProtectedApi && (instance = axiosPublicInstance);

      try {
        const { data } = await instance(url, {
          params: {
            page_no: currentPage,
            limit: "5",
          },
        });
        setData(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, isProtectedApi, currentPage]);

  return { data, isLoading, error, setData };
}
