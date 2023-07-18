const getHighlighted = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => {
        const isMatch = part.toLowerCase() === highlight.toLowerCase();
        return (
          <span key={i} style={isMatch ? { fontWeight: "bold" } : {}}>
            {part}
          </span>
        );
      })}
    </span>
  );
};

export default getHighlighted;
