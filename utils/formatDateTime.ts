export const formatDateTime = (date: Date): string => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString().slice(2); // 두 자리 연도
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
};
