import { css, styled } from "styled-components";

const KeywordGroup: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <>
      <StyledListTitle>{title}</StyledListTitle>
      <StyledListContent $children={children}>{children}</StyledListContent>
    </>
  );
};

const StyledListTitle = styled.div`
  padding: 0 30px 10px;
  font-weight: 700;
  font-size: 0.8rem;
  color: gray;
`;

const StyledListContent = styled.div<{ $children?: React.ReactNode }>`
  ${({ $children }) =>
    typeof $children === "string" &&
    css`
      padding: 0 30px;
      color: #aaa;
      font-weight: 700;
      margin-top: 10px;
    `}
`;

export default KeywordGroup;
