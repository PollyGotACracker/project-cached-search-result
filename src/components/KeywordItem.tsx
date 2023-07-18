import { styled } from "styled-components";
import { SickData } from "../types/sick";
import SearchIcon from "./SearchIcon";
import searchSubmit from "../utils/searchSubmit";
import getHighlighted from "../utils/getHighlighted";

type KeywordItemProps = {
  inputValue: string;
  recent?: string;
  result?: SickData;
};

const KeywordItem: React.FC<KeywordItemProps> = ({
  inputValue,
  recent,
  result,
}) => {
  const highlighted = result && getHighlighted(result?.sickNm, inputValue);

  return (
    <StyledKeywordItem
      data-code={result?.sickCd || recent}
      tabIndex={0}
      onClick={(e) => {
        const word = result?.sickNm || recent;
        searchSubmit(e, word);
      }}
    >
      <SearchIcon size={18} invert={50} />
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
  padding: 5px 30px;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default KeywordItem;
