import { Dispatch, SetStateAction, useRef } from "react";
import { styled } from "styled-components";
import SearchIcon from "./SearchIcon";
import { submitSearchType } from "../hooks/useSubmitSearch";

type SearchInputProps = {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  submitSearch: submitSearchType;
};

const SearchInput: React.FC<SearchInputProps> = ({
  isFocused,
  setIsFocused,
  inputValue,
  setInputValue,
  submitSearch,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <StyledInputWrapper
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      {!isFocused && !inputValue && (
        <StyledSearchInit>
          <SearchIcon size={20} invert={60} />
          <span>질환명을 입력해주세요</span>
        </StyledSearchInit>
      )}
      <StyledSearchInput
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        ref={inputRef}
        spellCheck={false}
        onFocus={() => setIsFocused(true)}
        onKeyDown={(e) => submitSearch(e, inputValue)}
      />
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-shrink: 1;
`;

const StyledSearchInput = styled.input`
  border: 0;
  outline: 0;
  width: calc(100% - 80px);
  background-color: transparent;
  font-size: 1.125rem;
  caret-color: var(--primary);
`;

const StyledSearchInit = styled.div`
  display: flex;
  position: absolute;
  column-gap: 10px;
  color: #a7afb7;
  font-weight: 700;
  cursor: text;
  -webkit-user-select: none;
  user-select: none;
`;

export default SearchInput;
