import { styled } from "styled-components";
import { SickData } from "../types/sick";
import KeywordItem from "./KeywordItem";
import SearchIcon from "./SearchIcon";
import KeywordGroup from "./KeywordGroup";

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
  const hasRecents = recentKeys.length !== 0;
  const hasResults = data.length !== 0;
  const isNoResults = inputValue && data.length === 0;

  const recents = recentKeys?.map((key) => (
    <KeywordItem key={key} inputValue={inputValue} recent={key}></KeywordItem>
  ));
  const content = data?.map((item) => (
    <KeywordItem key={item.sickCd} inputValue={inputValue} result={item} />
  ));

  return (
    <StyledKeywordList>
      {inputValue && (
        <StyledKeywordValue>
          <SearchIcon size={18} invert={50} />
          {inputValue}
        </StyledKeywordValue>
      )}
      {!inputValue && (
        <KeywordGroup title={"최근 검색어"}>
          {hasRecents ? recents : "최근 검색어가 없습니다"}
        </KeywordGroup>
      )}
      {hasResults && (
        <KeywordGroup title={"추천 검색어"}>{content}</KeywordGroup>
      )}
      {isNoResults && <KeywordGroup title={"검색어 없음"} />}
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
