import styled from "styled-components";
import searchSubmit from "../utils/searchSubmit";
import SearchIcon from "./SearchIcon";

const SearchButton: React.FC<{ inputValue: string }> = ({ inputValue }) => {
  return (
    <StyledSearchButton
      type="button"
      title="검색"
      onClick={(e) => searchSubmit(e, inputValue)}
    >
      <SearchIcon size={24} invert={100} />
    </StyledSearchButton>
  );
};

const StyledSearchButton = styled.button`
  position: absolute;
  top: calc(50% - 24px);
  right: 10px;
  background-color: var(--primary);
  border: none;
  border-radius: 50%;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  margin-left: auto;
  cursor: pointer;
`;

export default SearchButton;
