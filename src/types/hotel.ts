import { BookingType } from './booking';

export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning';

export type RoomImage = {
  data: {
    id: number;
    attributes: {
      url: string;
      formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large: { url: string };
      };
    };
  };
};

type ImageFormats = {
  large: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  };
  small: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  };
  medium: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  };
  thumbnail: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
  };
};

type Image = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Room = {
  id: number;
  documentId: string;
  room_number: string;
  floor: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  room_status: string;
  note: null;
  price_per_night: string;
  first_hourly_price: string;
  after_hour_price: string;
  img: Image;
  payments: string[];
  service_usages: string[];
  bookings: BookingType[];
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type RoomType = {
  data: Room;
  meta: Meta;
};
