export const changeDateString = (dateString: string | null | undefined) => {
  if (!dateString) return dateString;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};
