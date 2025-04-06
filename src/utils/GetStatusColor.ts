export const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-400";
    case "Occupied":
      return " bg-red-400";
    case "Cleaning":
      return "bg-chart-4 text-black";
    default:
      return "bg-muted text-muted-foreground";
  }
};
