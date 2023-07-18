import { useState, useEffect } from "react";
import checkEmptyText from "../utils/checkEmptyText";

type CachedItem<T> = { data: T[] | []; expires: Date };
type CachedList<T> = { [key: string]: CachedItem<T> };

const useCacheData = <T,>(expiresHour: number) => {
  const [cachedList, setCachedList] = useState<CachedList<T>>({});

  const getCachedItem = (key: string): CachedItem<T> | boolean =>
    cachedList[key] || false;

  const setCachedItem = (key: string, value: T[] | []) => {
    if (checkEmptyText(key)) return;
    const currentTime = new Date().getTime();
    const expires = new Date(currentTime + expiresHour * 60 * 60 * 1000);
    const cached = { data: value, expires: expires };
    setCachedList({ ...cachedList, [key]: cached });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCachedList: CachedList<T> = cachedList;
      const currentTime = new Date();

      for (const key in cachedList) {
        const cachedItem = cachedList[key];
        if (cachedItem.expires <= currentTime) {
          delete updatedCachedList[key];
        }
      }
      setCachedList({ ...updatedCachedList });
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [cachedList]);

  return { getCachedItem, setCachedItem };
};

export default useCacheData;
