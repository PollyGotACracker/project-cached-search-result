import { useState, useEffect } from "react";
import { useApiContext } from "../contexts/ApiContext";
import { SickData } from "../types/sick";
import useCacheData from "../hooks/useCacheData";
import { getRecentKeys } from "../utils/recentStorage";
import checkEmptyText from "../utils/checkEmptyText";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import SearchInput from "../components/SearchInput";
import SearchClear from "../components/SearchClear";
import SearchButton from "../components/SearchButton";
import KeywordList from "../components/KeywordList";

const Home = () => {
  const { getSickList } = useApiContext();
  const { getCachedItem, setCachedItem } = useCacheData<SickData>(1);
  const [sickList, setSickList] = useState<SickData[] | []>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!inputValue || checkEmptyText(inputValue)) return setSickList([]);
      const isValid = /^[\uAC00-\uD7A3|A-Z|a-z|\s]*$/.test(inputValue);
      if (isValid) {
        let data;
        data = getCachedItem(inputValue);
        if (!data) data = await getSickList(inputValue);
        const result = Array.isArray(data) ? data : [];
        setSickList([...result]);
        setCachedItem(inputValue, result);
      }
    })();
  }, [inputValue]);

  return (
    <main>
      <Title />
      <SearchBar setIsFocused={setIsFocused}>
        <SearchInput
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {inputValue && (
          <SearchClear setInputValue={setInputValue} setData={setSickList} />
        )}
        <SearchButton inputValue={inputValue} />
        {isFocused && (
          <KeywordList
            inputValue={inputValue}
            data={sickList}
            recentKeys={getRecentKeys()}
          />
        )}
      </SearchBar>
    </main>
  );
};

export default Home;
