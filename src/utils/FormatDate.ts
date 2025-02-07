export const formatDate = (isoString: string | undefined | null) => {
  if (!isoString) return null;
  return new Date(isoString);
};

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const hh = String(date.getHours()).padStart(2, '0');
  const MM = String(date.getMinutes()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const yyyy = date.getFullYear();

  return `${hh}:${MM} - ${dd}.${mm}.${yyyy}`;
}

export function calculateHours(checkIn: string, checkOut: string | null): number {
  const inTime = new Date(checkIn);
  const outTime = new Date(checkOut || new Date());

  let hoursWorked = (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60); // Chuyển từ mili-giây sang giờ

  return Math.ceil(hoursWorked);
}
