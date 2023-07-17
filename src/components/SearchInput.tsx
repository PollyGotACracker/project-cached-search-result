import { Dispatch, SetStateAction, useRef } from "react";
import { styled } from "styled-components";
import SearchIcon from "./SearchIcon";

type SearchInputProps = {
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  isFocused,
  setIsFocused,
  inputValue,
  setInputValue,
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
          <SearchIcon />
          <span>질환명을 입력해주세요</span>
        </StyledSearchInit>
      )}
      <StyledSearchInput
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        ref={inputRef}
        spellCheck={false}
        onFocus={() => setIsFocused(true)}
      />
    </StyledInputWrapper>
  );
};

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

const StyledSearchInit = styled.div`
  display: flex;
  position: absolute;
  column-gap: 10px;
  color: gray;

  & > svg {
    width: 18px;
    filter: invert(50%);
  }
`;

export default SearchInput;
