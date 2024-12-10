import { useCallback, useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";

function toCamelCase(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    acc[camelKey] = toCamelCase(obj[key]);
    return acc;
  }, {});
}

export function useFetch(path, options) {
  const method = options?.method || "GET";
  const immediate = method === "GET";
  const shouldTransform = options?.transformToCamelCase ?? false;
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState();

  const fetchData = useCallback(
    async (body) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(`${config.API_BASE_URL}${path}`, {
          method,
          headers: {
            ...options?.headers,
            "Content-Type": "application/json",
            Authorization: "Bearer tokennya",
          },
          body: body
            ? JSON.stringify(body)
            : options?.body
            ? JSON.stringify(options.body)
            : undefined,
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }

          throw new Error("Failed to fetch data");
        }

        const rawResult = await response.json();
        const result = shouldTransform ? toCamelCase(rawResult) : rawResult;

        setData(result);

        return result;
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error("An error occured"));
      } finally {
        setIsLoading(false);
      }
    },
    [path, method, shouldTransform, options?.body, options?.headers, navigate]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { data, isLoading, error, fetchData };
}
