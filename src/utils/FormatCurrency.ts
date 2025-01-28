export const formatCurrency = (amount: string): string => {
  const numericAmount = parseFloat(amount);

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(numericAmount);
};
