export const getRecentKeys = () => {
  const keywords = sessionStorage.getItem("recents");
  return keywords ? JSON.parse(keywords) : [];
};

export const setRecentKeys = (newKey: string) => {
  const keywords = getRecentKeys();
  const isNotEmpty = Array.isArray(keywords) && keywords.length !== 0;
  const isDuplicated = isNotEmpty && keywords.some((key) => key === newKey);
  const data = isDuplicated
    ? [...keywords]
    : isNotEmpty
    ? [...keywords, newKey]
    : [newKey];
  sessionStorage.setItem("recents", JSON.stringify(data));
};
