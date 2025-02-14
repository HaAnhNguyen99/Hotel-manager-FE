export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-chart-2 text-white';
    case 'Occupied':
      return 'bg-destructive text-white';
    case 'Cleaning':
      return 'bg-chart-4 text-black';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
