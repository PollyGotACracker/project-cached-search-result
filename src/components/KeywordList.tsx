import { styled } from "styled-components";
import { SickData } from "../types/sick";
import KeywordItem from "./KeywordItem";
import SearchIcon from "./SearchIcon";
import KeywordGroup from "./KeywordGroup";
import RecommendList from "./RecommendList";
import { submitSearchType } from "../hooks/useSubmitSearch";

type KeywordListProps = {
  recentKeys: string[];
  data: SickData[];
  inputValue: string;
  submitSearch: submitSearchType;
};

const KeywordList: React.FC<KeywordListProps> = ({
  recentKeys,
  data,
  inputValue,
  submitSearch,
}) => {
  const hasRecents = recentKeys.length !== 0;
  const hasResults = data.length !== 0;
  const isNoResults = inputValue && data.length === 0;

  const recents = recentKeys?.map((key) => (
    <KeywordItem
      key={key}
      inputValue={inputValue}
      submitSearch={submitSearch}
      recent={key}
    ></KeywordItem>
  ));
  const content = data?.map((item) => (
    <KeywordItem
      key={item.sickCd}
      inputValue={inputValue}
      submitSearch={submitSearch}
      result={item}
    />
  ));

  return (
    <StyledKeywordList>
      {inputValue && (
        <StyledKeywordValue
          tabIndex={0}
          onClick={(e) => submitSearch(e, inputValue)}
        >
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
      {!inputValue && (
        <>
          <StyledHr />
          <KeywordGroup title={"추천 검색어로 검색해보세요"}>
            <RecommendList submitSearch={submitSearch} />
          </KeywordGroup>
        </>
      )}
    </StyledKeywordList>
  );
};

const StyledHr = styled.hr`
  background: #edf0f2;
  height: 1px;
  border: 0;
  margin: 12px 0;
`;

const StyledKeywordList = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  left: 0;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
  padding: 18px 0;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.02);
`;

const StyledKeywordValue = styled.div`
  width: 100%;
  display: flex;
  column-gap: 10px;
  margin-top: 10px;
  padding: 8px 30px;
  outline: none;
  font-weight: 700;
  cursor: pointer;

  & > svg {
    width: 18px;
    filter: invert(50%);
    flex-shrink: 0;
  }
  &:hover,
  &:focus {
    background-color: #f8f9fa;
  }
`;

export default KeywordList;
