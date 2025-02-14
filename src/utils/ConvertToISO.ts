export const convertToISO = (dateString: string): string => {
  const originalDate = new Date(dateString);

  if (isNaN(originalDate.getTime())) {
    throw new Error('Invalid date string');
  }

  return originalDate.toISOString();
};
