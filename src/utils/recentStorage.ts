export const getRecentKeys = () => {
  const keywords = sessionStorage.getItem("recents");
  return keywords ? JSON.parse(keywords) : false;
};

export const setRecentKeys = (key: string) => {
  const keywords = getRecentKeys();
  const data = Array.isArray(keywords) ? [...keywords, key] : [key];
  sessionStorage.setItem("recents", JSON.stringify(data));
};
