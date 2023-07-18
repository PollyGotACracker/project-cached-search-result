import { styled } from "styled-components";

const Title = () => {
  return (
    <StyledTitle>
      국내 모든 임상시험 검색하고
      <br />
      온라인으로 참여하기
    </StyledTitle>
  );
};

const StyledTitle = styled.h2`
  font-family: inherit;
  font-size: 2.125rem;
  font-weight: 700;
  word-break: keep-all;
  letter-spacing: -0.018em;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 40px;
`;

export default Title;
