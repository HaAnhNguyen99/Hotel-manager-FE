/**
 * Formats a date string into a human-readable date and time format.
 *
 * @param isoString - The date string to format.
 * @returns The formatted date and time string.
 */
export const formatDate = (isoString: string | undefined | null) => {
  if (!isoString) return null;
  return new Date(isoString);
};

/**
 * Formats a date string into a human-readable date and time format.
 *
 * @param dateString - The date string to format.
 * @returns The formatted date and time string.
 */
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const hh = String(date.getHours()).padStart(2, "0");
  const MM = String(date.getMinutes()).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const yyyy = date.getFullYear();

  return `${hh}:${MM} - ${dd}.${mm}.${yyyy}`;
}

/**
 * Calculates the number of hours between two dates.
 *
 * @param checkIn - The starting date in ISO format.
 * @param checkOut - The ending date in ISO format.
 * @returns The number of hours between the two dates.
 */
export function calculateHours(
  checkIn: string,
  checkOut: string | null
): number {
  const inTime = new Date(checkIn);
  const outTime = new Date(checkOut || new Date());

  const hoursWorked = (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60);

  return Math.ceil(hoursWorked);
}
