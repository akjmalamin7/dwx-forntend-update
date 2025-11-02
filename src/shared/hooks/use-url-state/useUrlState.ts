// hooks/useUrlState.ts
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getUrlParam = useCallback(
    (key: string, defaultValue: string = ""): string => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  const getUrlParamNumber = useCallback(
    (key: string, defaultValue: number = 1): number => {
      const value = searchParams.get(key);
      const num = value ? parseInt(value, 10) : defaultValue;
      return isNaN(num) ? defaultValue : num;
    },
    [searchParams]
  );

  const setUrlParam = useCallback(
    (key: string, value: string | number) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const setMultipleUrlParams = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value.toString());
        } else {
          newParams.delete(key);
        }
      });
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    getUrlParam,
    getUrlParamNumber,
    setUrlParam,
    setMultipleUrlParams,
    searchParams,
  };
};
