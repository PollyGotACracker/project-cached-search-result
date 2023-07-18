const checkEmptyText = (text: string) => {
  const removedBlank = text.replace(/\s/g, "");
  return removedBlank === "";
};

export default checkEmptyText;
