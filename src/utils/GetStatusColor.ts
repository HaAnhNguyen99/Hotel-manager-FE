export const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-chart-2 text-white';
    case 'occupied':
      return 'bg-destructive text-white';
    case 'cleaning':
      return 'bg-chart-4 text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
