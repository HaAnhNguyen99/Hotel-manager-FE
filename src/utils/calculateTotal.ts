import { UpdateServiceUsagePayload } from "@/types/service_usage";

export function calculateTotal(services: UpdateServiceUsagePayload[]): number {
  return services.reduce((total, usage) => {
    const price = parseFloat(usage.service.price);
    return total + price * usage.quantity;
  }, 0);
}
