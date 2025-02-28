export const formatDateToString = (date: Date): string => {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + 9);
  return `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};
