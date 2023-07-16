import { styled } from "styled-components";
import { SickData } from "../types/sick";
import SearchIcon from "./SearchIcon";

const KeywordItem: React.FC<{ item: SickData }> = ({ item }) => {
  return (
    <StyledKeywordItem data-code={item.sickCd} tabIndex={0}>
      <SearchIcon />
      {item.sickNm}
    </StyledKeywordItem>
  );
};

const StyledKeywordItem = styled.a`
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
