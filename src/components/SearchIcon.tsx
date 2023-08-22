// https://iconsvg.xyz/

import { styled } from "styled-components";

const SearchIcon: React.FC<{
  size: number;
  strokeColor?: string;
}> = ({ size, strokeColor }) => {
  return (
    <StyledSearchIcon
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </StyledSearchIcon>
  );
};

const StyledSearchIcon = styled.svg`
  flex-shrink: 0;
`;

SearchIcon.defaultProps = {
  strokeColor: "#a7afb7",
};

export default SearchIcon;
