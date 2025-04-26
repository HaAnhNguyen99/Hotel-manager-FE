import { Image } from "./hotel";
import { ServiceStatus } from "./service_usage";

export interface ServiceData {
  id: number;
  documentId: string;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  note: object | null;
  img: Image;
}

export interface UseServiceResult {
  data: ServiceData[];
  loading: boolean;
  error: Error | null;
}

export interface CreateServiceUsagePayload {
  data: {
    service: string;
    quantity: number;
    UsageDate: string;
    booking: string | null;
    service_status?: ServiceStatus;
  };
}
