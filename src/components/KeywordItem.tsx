import { styled } from "styled-components";
import { SickData } from "../types/sick";
import SearchIcon from "./SearchIcon";
import searchSubmit from "../utils/searchSubmit";

const KeywordItem: React.FC<{ text?: string; item?: SickData }> = ({
  text,
  item,
}) => {
  return (
    <StyledKeywordItem
      data-code={item?.sickCd || text}
      tabIndex={0}
      onClick={(e) => {
        const value = item?.sickNm || text;
        searchSubmit(e, value);
      }}
    >
      <SearchIcon />
      {item?.sickNm || text}
    </StyledKeywordItem>
  );
};

const StyledKeywordItem = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  margin: 5px 0;
  cursor: pointer;
  padding: 5px 30px;
  outline: none;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }

  & > svg {
    width: 18px;
    filter: invert(50%);
    flex-shrink: 0;
  }
`;

export default KeywordItem;
