export const ConvertRoomStatus = (status: string) => {
  switch (status) {
    case 'Available':
      return 'Trống';
    case 'Occupied':
      return 'Có người';
    default:
      return 'Đang dọn dẹp';
  }
};
