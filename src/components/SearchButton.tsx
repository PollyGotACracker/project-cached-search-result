import styled from "styled-components";
import searchSubmit from "../utils/searchSubmit";
import SearchIcon from "./SearchIcon";

const SearchButton: React.FC<{ inputValue: string }> = ({ inputValue }) => {
  return (
    <StyledSearchButton
      type="button"
      onClick={(e) => searchSubmit(e, inputValue)}
    >
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
