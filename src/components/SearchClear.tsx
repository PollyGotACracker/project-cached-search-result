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
      onClick={() => {
        setInputValue("");
        setData([]);
      }}
    >
      &#10006;
    </StyledSearchClear>
  );
};

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

export default SearchClear;
