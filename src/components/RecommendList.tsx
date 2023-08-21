import { styled } from "styled-components";
import { recommends } from "../constants/recommends";
import searchSubmit from "../utils/searchSubmit";

const RecommendList = () => {
  return (
    <StyledRecommendList>
      {recommends.map((item) => (
        <StyledRecommend key={item} onClick={(e) => searchSubmit(e, item)}>
          {item}
        </StyledRecommend>
      ))}
    </StyledRecommendList>
  );
};

const StyledRecommendList = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px;
  flex-wrap: wrap;
`;

const StyledRecommend = styled.span`
  background-color: #eef8ff;
  color: #007be9;
  padding: 10px 15px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.8rem;
  word-break: keep-all;
  cursor: pointer;
`;

export default RecommendList;
