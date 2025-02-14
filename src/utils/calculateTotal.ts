export function calculateTotal(services): number {
  return services.reduce((total, usage) => {
    const price = parseFloat(usage.service.price);
    return total + price * usage.quantity;
  }, 0);
}
