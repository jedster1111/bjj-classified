import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export const useLoadData = <T>(
  loadData: () => Promise<AxiosResponse<T>>
): [
  isLoading: boolean | undefined,
  error: Error | undefined,
  data: T | undefined
] => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function handleLoad() {
      try {
        setIsLoading(true);
        setError(undefined);
        setData(undefined);

        const data = (await loadData()).data;
        setData(data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    handleLoad();
  }, [loadData]);

  return [isLoading, error, data];
};
