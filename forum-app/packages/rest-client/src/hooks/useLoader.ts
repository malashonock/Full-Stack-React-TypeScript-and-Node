import { useEffect, useState } from 'react';

import { LoadResult } from 'common/types';

export interface UseLoaderParams<TResult, TArgs extends any[]> {
  loader: (...args: TArgs) => TResult | Promise<TResult>;
  loaderArgs: Partial<TArgs>;
  initialValue: TResult;
  dependencies?: any[];
}

export const useLoader = <TResult, TArgs extends any[]>({
  loader,
  loaderArgs,
  initialValue,
  dependencies,
}: UseLoaderParams<TResult, TArgs>): LoadResult<TResult> => {
  const [data, setData] = useState<TResult>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loaderArgs.some((arg) => !arg)) {
      return;
    }

    try {
      (async () => {
        const fetchedData = await loader.apply(null, loaderArgs as TArgs);
        setData(fetchedData);
      })();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [...loaderArgs, ...(dependencies ?? [])]);

  return {
    data,
    isLoading,
  };
};
