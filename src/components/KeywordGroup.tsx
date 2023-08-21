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
  padding: 10px 30px;
  font-weight: 600;
  font-size: 0.8rem;
  color: #6a737b;
`;

const StyledListContent = styled.div<{ $children?: React.ReactNode }>`
  ${({ $children }) =>
    typeof $children === "string" &&
    css`
      padding: 12px 30px;
      color: #afafb7;
      font-weight: 700;
    `}
`;

export default KeywordGroup;
