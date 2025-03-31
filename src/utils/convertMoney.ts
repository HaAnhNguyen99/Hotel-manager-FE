export const convertMoney = (money: number | string) => {
  return money.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
