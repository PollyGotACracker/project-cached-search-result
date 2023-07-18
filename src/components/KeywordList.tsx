import { styled } from "styled-components";
import { SickData } from "../types/sick";
import KeywordItem from "./KeywordItem";
import SearchIcon from "./SearchIcon";

type KeywordListProps = {
  recentKeys: string[];
  data: SickData[];
  inputValue: string;
};

const KeywordList: React.FC<KeywordListProps> = ({
  recentKeys,
  data,
  inputValue,
}) => {
  const isInResults = data.length !== 0;
  const isNoResults = inputValue && data.length === 0;

  const recents = recentKeys?.map((key) => (
    <KeywordItem key={key} text={key}></KeywordItem>
  ));
  const content = data?.map((item) => (
    <KeywordItem key={item.sickCd} item={item} />
  ));

  return (
    <StyledKeywordList>
      {inputValue && (
        <StyledKeywordValue>
          <SearchIcon />
          {inputValue}
        </StyledKeywordValue>
      )}
      {!inputValue && (
        <>
          <StyledListTitle>{"최근 검색어"}</StyledListTitle>
          {recents}
        </>
      )}
      {isInResults && (
        <>
          <StyledListTitle>{"추천 검색어"}</StyledListTitle>
          {content}
        </>
      )}
      {isNoResults && <StyledListTitle>{"검색어 없음"}</StyledListTitle>}
    </StyledKeywordList>
  );
};

const StyledKeywordList = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  left: 0;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
  padding: 30px 0;
`;

const StyledListTitle = styled.div`
  padding: 0 30px;
  font-size: 0.8rem;
  color: gray;
`;

const StyledKeywordValue = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  margin: 5px 0;
  padding: 5px 30px;
  outline: none;
  font-weight: 700;

  & > svg {
    width: 18px;
    filter: invert(50%);
    flex-shrink: 0;
  }
`;

export default KeywordList;
