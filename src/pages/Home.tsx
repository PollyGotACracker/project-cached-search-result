import { useState } from "react";
import { getRecentKeys } from "../utils/recentStorage";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import SearchInput from "../components/SearchInput";
import SearchClear from "../components/SearchClear";
import SearchButton from "../components/SearchButton";
import KeywordList from "../components/KeywordList";
import useSubmitSearch from "../hooks/useSubmitSearch";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { submitSearch } = useSubmitSearch(setIsFocused, setInputValue);
  const { sickList, setSickList } = useDebounce(inputValue, 100);

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
