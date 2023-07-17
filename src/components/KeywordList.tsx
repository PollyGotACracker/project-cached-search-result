import { styled } from "styled-components";
import { SickData } from "../types/sick";
import KeywordItem from "./KeywordItem";

type KeywordListProps = {
  data: SickData[];
  inputValue: string;
};

const KeywordList: React.FC<KeywordListProps> = ({ data, inputValue }) => {
  const content = data?.map((item) => (
    <KeywordItem key={item.sickCd} item={item} />
  ));

  return (
    <StyledKeywordList>
      <StyledKeywordListTitle>
        {inputValue ? "추천 검색어" : "검색어 없음"}
      </StyledKeywordListTitle>
      {content}
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

const StyledKeywordListTitle = styled.div`
  padding: 0 30px;
  font-size: 0.8rem;
  color: gray;
`;

export default KeywordList;
