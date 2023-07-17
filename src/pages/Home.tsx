import { useState, useEffect } from "react";
import { useApiContext } from "../contexts/ApiContext";
import { SickData } from "../types/sick";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import SearchInput from "../components/SearchInput";
import SearchClear from "../components/SearchClear";
import SearchButton from "../components/SearchButton";
import KeywordList from "../components/KeywordList";

const Home = () => {
  const [sickList, setSickList] = useState<SickData[] | []>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { getSickList } = useApiContext();

  // 임시 코드
  useEffect(() => {
    (async () => {
      if (!inputValue) return;
      const data = await getSickList(inputValue);
      if (Array.isArray(data)) setSickList([...data]);
      if (!data || !inputValue) setSickList([]);
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
        <SearchButton />
        {isFocused && <KeywordList inputValue={inputValue} data={sickList} />}
      </SearchBar>
    </main>
  );
};

export default Home;
