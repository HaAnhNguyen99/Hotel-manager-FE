export const formatDate = (isoString: string | undefined | null) => {
  if (!isoString) return null;
  return new Date(isoString);
};
