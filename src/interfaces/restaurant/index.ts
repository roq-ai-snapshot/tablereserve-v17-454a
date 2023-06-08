import { TableInterface } from 'interfaces/table';
import { WaiterInterface } from 'interfaces/waiter';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  table?: TableInterface[];
  waiter?: WaiterInterface[];
  user?: UserInterface;
  _count?: {
    table?: number;
    waiter?: number;
  };
}
