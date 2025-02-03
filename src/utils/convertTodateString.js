export default function convertTodateString(date) {
  return date ? new Date(date).toDateString() : new Date().toDateString();
}

export const getDay_month_yearFormated = (inputDate) => {
  if (!inputDate) return null;
  const date = new Date(inputDate);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
