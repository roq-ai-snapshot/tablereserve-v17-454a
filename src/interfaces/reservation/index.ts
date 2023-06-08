import { PreferenceInterface } from 'interfaces/preference';
import { UserInterface } from 'interfaces/user';
import { TableInterface } from 'interfaces/table';

export interface ReservationInterface {
  id?: string;
  customer_id: string;
  table_id: string;
  reservation_time: Date;
  created_at?: Date;
  updated_at?: Date;
  preference?: PreferenceInterface[];
  user?: UserInterface;
  table?: TableInterface;
  _count?: {
    preference?: number;
  };
}
