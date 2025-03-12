export const formatDateToString = (date: Date | string): string => {
  const utcDate = new Date(date);
  const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000);

  return `${kstDate.getFullYear()}년 ${kstDate.getMonth() + 1}월 ${kstDate.getDate()}일`;
};
