import { BookingType } from './booking';
import { ServiceData } from './service';

export interface UpdateServiceUsagePayload {
  id: number;
  documentId: string;
  rooms: string;
  service: ServiceData;
  quantity: number;
  UsageDate: string;
  booking: BookingType;
  service_status: string;
}
