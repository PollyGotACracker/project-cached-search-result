import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SickData } from "../types/sick";
import KeywordList from "./KeywordList";
import SearchIcon from "./SearchIcon";
import SearchInit from "./SearchInit";

type SearchBarProps = {
  data: SickData[];
  getData: (value: string) => Promise<boolean | void | SickData[]>;
  setData: Dispatch<SetStateAction<SickData[]>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ data, getData, setData }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 컴포넌트 분리 필요
  // 임시 코드
  const removeFocus = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", removeFocus);
    return () => document.body.removeEventListener("click", removeFocus);
  }, []);

  useEffect(() => {
    (async () => {
      if (!inputValue) return;
      const data = await getData(inputValue);
      if (Array.isArray(data)) setData([...data]);
      if (!data || !inputValue) setData([]);
    })();
  }, [inputValue]);

  return (
    <StyledSearchBar>
      <StyledInputWrapper
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        {!isFocused && !inputValue && <SearchInit />}
        <StyledSearchInput
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          ref={inputRef}
          spellCheck={false}
          onFocus={() => setIsFocused(true)}
        />
      </StyledInputWrapper>
      {inputValue && (
        <StyledSearchClear
          type="button"
          tabIndex={-1}
          onClick={() => {
            setInputValue("");
            setData([]);
          }}
        >
          &#10006;
        </StyledSearchClear>
      )}
      <StyledSearchButton type="button">
        <SearchIcon />
      </StyledSearchButton>
      {isFocused && <KeywordList data={data} />}
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  position: relative;
  width: 500px;
  border-radius: 999px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  padding: 20px 10px 20px 24px;
  display: flex;
  place-items: center;
  column-gap: 20px;

  &:focus-within {
    border-color: var(--primary);
  }
`;

const StyledInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const StyledSearchInput = styled.input`
  border: 0;
  outline: 0;
  flex: 1;

  background-color: transparent;
  font-size: 1.125rem;
  caret-color: var(--primary);
`;

const StyledSearchClear = styled.button`
  text-align: center;
  background-color: gray;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
`;

const StyledSearchButton = styled.button`
  background-color: var(--primary);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-left: auto;
  cursor: pointer;

  & > svg {
    filter: invert(100%);
  }
`;

export default SearchBar;
