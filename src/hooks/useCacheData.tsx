import { useState } from "react";

type CachedItem<T> = T[];
type CachedList<T> = { [key: string]: T[] };

const useCacheData = <T,>() => {
  const [cachedList, setCachedList] = useState<CachedList<T>>({});

  const getCachedItem = (key: string): CachedItem<T> | boolean => {
    const data = cachedList[key];
    return data ? data : false;
  };

  const setCachedItem = (key: string, value: CachedItem<T> | []) => {
    setCachedList({ ...cachedList, [key]: value });
  };

  return { getCachedItem, setCachedItem };
};

export default useCacheData;
