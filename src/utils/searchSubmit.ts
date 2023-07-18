import { setRecentKeys } from "./recentStorage";

const searchSubmit = (event: React.SyntheticEvent, value: string = "") => {
  const isEnter = (event as React.KeyboardEvent).key === "Enter";
  const isClick = (event as React.MouseEvent).type === "click";
  if (isEnter || isClick) {
    setRecentKeys(value);
  }
};

export default searchSubmit;
