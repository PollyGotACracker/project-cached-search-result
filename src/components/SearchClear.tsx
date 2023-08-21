import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SickData } from "../types/sick";

type SearchClearProps<T> = {
  setInputValue: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<T[]>>;
};

const SearchClear: React.FC<SearchClearProps<SickData>> = ({
  setInputValue,
  setData,
}) => {
  return (
    <StyledSearchClear
      type="button"
      tabIndex={-1}
      onClick={(e) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLButtonElement;
        const input = target.parentElement?.firstElementChild
          ?.firstElementChild as HTMLInputElement;
        input.focus();
        setInputValue("");
        setData([]);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </StyledSearchClear>
  );
};

const StyledSearchClear = styled.button`
  position: absolute;
  top: calc(50% - 10px);
  right: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a7afb7;
  flex-shrink: 0;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
`;

export default SearchClear;
