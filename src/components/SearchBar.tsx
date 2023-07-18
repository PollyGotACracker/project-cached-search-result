import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";

type SearchBarProps = {
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const SearchBar: React.FC<SearchBarProps> = ({ setIsFocused, children }) => {
  useEffect(() => {
    const removeFocus = () => setIsFocused(false);
    document.body.addEventListener("click", removeFocus);
    return () => document.body.removeEventListener("click", removeFocus);
  }, []);

  return <StyledSearchBar>{children}</StyledSearchBar>;
};

const StyledSearchBar = styled.div`
  position: relative;
  width: 500px;
  border-radius: 999px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  padding: 15px 10px 15px 24px;
  display: flex;
  place-items: center;
  column-gap: 20px;

  &:focus-within {
    border-color: var(--primary);
  }

  // @media (pointer: coarse) {
  //   width: auto;
  //   flex: 1;
  //   padding: 0;
  //   column-gap: 5px;
  // }
`;

export default SearchBar;
