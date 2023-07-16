import { styled } from "styled-components";
import SearchIcon from "./SearchIcon";

const SearchInit = () => {
  return (
    <StyledSearchInit>
      <SearchIcon />
      <span>질환명을 입력해주세요</span>
    </StyledSearchInit>
  );
};

const StyledSearchInit = styled.div`
  display: flex;
  position: absolute;
  column-gap: 10px;
  color: gray;

  & > svg {
    width: 18px;
    filter: invert(50%);
  }
`;

export default SearchInit;
