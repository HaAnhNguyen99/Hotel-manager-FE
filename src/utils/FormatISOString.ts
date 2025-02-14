export const formatISODate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour12: false,
  });
};
