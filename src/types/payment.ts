export interface CreatePaymentData {
  booking: string;
  amount: number;
  payment_method: PaymentMethod;
}

export interface CreatePaymentPayload {
  data: CreatePaymentData;
}

export enum PaymentMethod {
  Cash = "cash",
  Banking = "banking",
}
