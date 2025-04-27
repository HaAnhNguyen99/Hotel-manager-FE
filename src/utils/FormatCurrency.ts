export const formatCurrency = (amount?: string): string => {
  if (!amount) return "";

  const numericAmount = parseFloat(amount);

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(numericAmount);
};
