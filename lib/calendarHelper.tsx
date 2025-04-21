const handleMonthView = (selectedDate: Date) => {
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  const daysInMonthView: Date[] = [];

  // Move to Monday of the first visible week (if week starts on Monday)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Ensure exactly 42 days are added (6 x 7 grid)
  while (daysInMonthView.length < 42) {
    daysInMonthView.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return daysInMonthView;
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export { handleMonthView, DAYS };
