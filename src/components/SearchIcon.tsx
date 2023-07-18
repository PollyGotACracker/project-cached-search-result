// https://iconsvg.xyz/

import { styled, css } from "styled-components";

const SearchIcon: React.FC<{ size: number; invert: number }> = ({
  size,
  invert,
}) => {
  return (
    <StyledSearchIcon
      $size={size}
      $invert={invert}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </StyledSearchIcon>
  );
};

const StyledSearchIcon = styled.svg<{ $size: number; $invert: number }>`
  ${({ $size, $invert }) => css`
    width: ${$size}px;
    filter: invert(${$invert}%);
  `}
  flex-shrink: 0;
`;

export default SearchIcon;
