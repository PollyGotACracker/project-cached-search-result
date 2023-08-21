import { useState, useEffect } from "react";
import checkEmptyText from "../utils/checkEmptyText";

type CachedItem<T> = { data: T[] | []; expires: Date };
type CachedList<T> = { [key: string]: CachedItem<T> };

const useCacheData = <T,>(expiresHour: number) => {
  const [cachedList, setCachedList] = useState<CachedList<T>>({});

  const getCachedItem = (key: string): T[] | undefined => cachedList[key]?.data;

  const setCachedItem = (key: string, value: T[] | []) => {
    if (checkEmptyText(key) || cachedList.hasOwnProperty(key)) return false;
    const expires = new Date(Date.now() + expiresHour * 60 * 60 * 1000);
    const cached = { data: value, expires: expires };
    setCachedList({ ...cachedList, [key]: cached });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCachedList: CachedList<T> = cachedList;
      const currentTime = new Date();

      for (const key in updatedCachedList) {
        const cachedItem = cachedList[key];
        if (cachedItem.expires <= currentTime) {
          delete updatedCachedList[key];
        }
      }
      setCachedList({ ...updatedCachedList });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [cachedList]);

  return { cachedList, getCachedItem, setCachedItem };
};

export default useCacheData;
