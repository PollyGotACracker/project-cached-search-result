import { styled } from "styled-components";
import { SickData } from "../types/sick";
import SearchIcon from "./SearchIcon";
import getHighlighted from "../utils/getHighlighted";
import { submitSearchType } from "../hooks/useSubmitSearch";

type KeywordItemProps = {
  inputValue: string;
  submitSearch: submitSearchType;
  recent?: string;
  result?: SickData;
};

const KeywordItem: React.FC<KeywordItemProps> = ({
  inputValue,
  submitSearch,
  recent,
  result,
}) => {
  const highlighted = result && getHighlighted(result?.sickNm, inputValue);
  const searchHandler = (e: React.SyntheticEvent) => {
    const word = result?.sickNm || recent;
    submitSearch(e, word);
  };

  return (
    <StyledKeywordItem
      data-code={result?.sickCd || recent}
      tabIndex={0}
      onClick={searchHandler}
      onKeyDown={searchHandler}
    >
      <SearchIcon size={18} />
      {highlighted || recent}
    </StyledKeywordItem>
  );
};

const StyledKeywordItem = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  margin: 5px 0;
  cursor: pointer;
  outline: none;
  padding: 8px 30px;

  &:hover,
  &:focus {
    background-color: #f8f9fa;
  }
`;

export default KeywordItem;
