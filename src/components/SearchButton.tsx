import SearchIcon from "./SearchIcon";
import styled from "styled-components";

const SearchButton = () => {
  return (
    <StyledSearchButton type="button">
      <SearchIcon />
    </StyledSearchButton>
  );
};

const StyledSearchButton = styled.button`
  background-color: var(--primary);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-left: auto;
  cursor: pointer;

  & > svg {
    filter: invert(100%);
  }
`;

export default SearchButton;
