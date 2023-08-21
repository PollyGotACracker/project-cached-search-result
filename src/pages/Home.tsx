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
import useSubmitSearch from "../hooks/useSubmitSearch";

const Home = () => {
  const { getSickList } = useApiContext();
  const { getCachedItem, setCachedItem } = useCacheData<SickData>(1);
  const [sickList, setSickList] = useState<SickData[] | []>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { submitSearch } = useSubmitSearch(setIsFocused, setInputValue);

  const checkValidText = (value: string) => {
    const isCompletedText = /^[\uAC00-\uD7A3|A-Z|a-z|\s]*$/.test(value);
    if (checkEmptyText(value)) return false;
    if (isCompletedText) return true;
    return false;
  };

  const getCachedOrFetchData = async (value: string) => {
    const data = getCachedItem(value) || (await getSickList(value));
    return Array.isArray(data) ? data : [];
  };

  useEffect(() => {
    (async () => {
      const isValidText = checkValidText(inputValue);
      if (!isValidText) return setSickList([]);
      if (isValidText) {
        const result = await getCachedOrFetchData(inputValue);
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
          submitSearch={submitSearch}
        />
        {isFocused && (
          <SearchClear setInputValue={setInputValue} setData={setSickList} />
        )}
        <SearchButton inputValue={inputValue} submitSearch={submitSearch} />
        {isFocused && (
          <KeywordList
            inputValue={inputValue}
            data={sickList}
            recentKeys={getRecentKeys()}
            submitSearch={submitSearch}
          />
        )}
      </SearchBar>
    </main>
  );
};

export default Home;
