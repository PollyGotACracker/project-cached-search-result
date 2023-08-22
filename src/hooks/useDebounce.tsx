import { useEffect, useState, useRef } from "react";
import { useApiContext } from "../contexts/ApiContext";
import useCacheData from "./useCacheData";
import checkEmptyText from "../utils/checkEmptyText";
import { SickData } from "../types/sick";

type savedDataType = { key: string; value: SickData[] | [] };

const useDebounce = (keyword: string, delay: number) => {
  const { getSickList } = useApiContext();
  const { getCachedItem, setCachedItem } = useCacheData<SickData>(1);
  const [validKeyword, setValidKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedData, setSavedData] = useState<savedDataType>({
    key: "",
    value: [],
  });
  const [sickList, setSickList] = useState<SickData[] | []>([]);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkValidText = (text: string) => {
    const isCompletedText = /^[\uAC00-\uD7A3|A-Z|a-z|\s]*$/.test(text);
    if (checkEmptyText(text)) return false;
    if (isCompletedText) return true;
    return false;
  };

  const clearDebounceTimer = () => {
    if (timerId.current) clearTimeout(timerId.current);
  };

  useEffect(() => {
    const isValidText = checkValidText(keyword);
    if (!isValidText) return setSickList([]);
    if (isValidText) {
      const data = getCachedItem(keyword);
      if (data) setSavedData({ key: keyword, value: [...data] });
      else {
        setIsLoading(() => {
          setValidKeyword(keyword);
          return true;
        });
      }
    }
  }, [keyword]);

  useEffect(() => {
    (async () => {
      clearDebounceTimer();

      // 최초 로드 시 실행 방지
      if (validKeyword !== "") {
        timerId.current = setTimeout(async () => {
          const data = await getSickList(validKeyword);
          if (data)
            setIsLoading(() => {
              setSavedData({ key: validKeyword, value: [...data] });
              return false;
            });
        }, delay);
      }
      return () => clearDebounceTimer();
    })();
  }, [validKeyword]);

  useEffect(() => {
    setSickList([...savedData.value]);
    if (!getCachedItem(savedData.key)) {
      setCachedItem(savedData.key, savedData.value);
    }
  }, [savedData]);

  return { sickList, setSickList, isLoading };
};

export default useDebounce;
