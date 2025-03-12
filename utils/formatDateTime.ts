export const formatDateTime = (date: Date | string): string => {
  const utcDate = new Date(date);
  const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000); // UTC → KST 변환

  const year = kstDate.getFullYear().toString().slice(2); // 두 자리 연도
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day}. ${hours}:${minutes}`;
};
