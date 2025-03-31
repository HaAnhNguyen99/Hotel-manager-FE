import { PaymentMethod } from "@/types/payment";
import { RevenueData } from "@/types/reservation";

export const PaymentMethods = (data: RevenueData[]) => {
  return data.reduce(
    (acc, item) => {
      const amount = Number(item.amount);

      if (item.payment_method === PaymentMethod.Cash) {
        acc.cash += amount;
      } else if (item.payment_method === PaymentMethod.Banking) {
        acc.banking += amount;
      }

      return acc;
    },
    { cash: 0, banking: 0 }
  );
};
 