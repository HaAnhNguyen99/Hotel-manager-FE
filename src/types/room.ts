import { Meta, Room } from './hotel';

export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Cleaning = 'Cleaning',
}

export interface FetchRoom {
  data: Room[];
  meta: Meta;
}
