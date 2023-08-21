import { Dispatch, SetStateAction } from "react";
import { setRecentKeys } from "../utils/recentStorage";

export interface submitSearchType {
  (event: React.SyntheticEvent, value: string | undefined): void;
}

interface useSubmitSearchType {
  (
    setIsFocused: Dispatch<SetStateAction<boolean>>,
    setInputValue: Dispatch<SetStateAction<string>>
  ): { submitSearch: submitSearchType };
}

const useSubmitSearch: useSubmitSearchType = (setIsFocused, setInputValue) => {
  const submitSearch: submitSearchType = (event, value = "") => {
    const isEnter = (event as React.KeyboardEvent).key === "Enter";
    const isClick = (event as React.MouseEvent).type === "click";
    if (isEnter || isClick) {
      setRecentKeys(value);
      setIsFocused(false);
      setInputValue("");
    }
  };

  return { submitSearch };
};

export default useSubmitSearch;
