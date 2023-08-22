import styled from "styled-components";
import SearchIcon from "./SearchIcon";
import { submitSearchType } from "../hooks/useSubmitSearch";

const SearchButton: React.FC<{
  inputValue: string;
  submitSearch: submitSearchType;
}> = ({ inputValue, submitSearch }) => {
  return (
    <StyledSearchButton
      type="button"
      title="검색"
      onClick={(e) => submitSearch(e, inputValue)}
    >
      <SearchIcon size={24} strokeColor="#ffffff" />
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
