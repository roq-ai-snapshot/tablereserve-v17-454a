import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface WaiterInterface {
  id?: string;
  user_id: string;
  restaurant_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
