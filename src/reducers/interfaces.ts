import { IRoll } from '../helpers/dice';

export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface IMessage {
  author: string;
  time: number;
  body: string;
  grouped?: boolean; // Remove header and top margin of message, because author is the same
  isRP?: boolean;
  mentioned?: boolean;
  rolls?: IRoll[];
  data?: { [key: string]: any }; // Extra data for special purposes
}

export interface IState {
  userData: IUser | null;
  isLoggedIn: boolean;
  settings: IUser | false;
  loading: boolean;
  messages: IMessage[];
  users: IUsers;
  uid: string;
  currentUser: IUser | null;
  items: IItem[];
  error: Error | false;
  notify?: string;
  redirect?: string;
  usersActivity: {[key: string]: string};
}

export interface IInventoryItem {
  id: string;
  time: number;
  type: ItemType;
  amount: number;
}

export interface IInventory {
  [key: string]: IInventoryItem;
}

export interface IUser {
  nickname: string;
  avatar: string;
  uid: string,
  lastOnline: number;
  isAdmin?: boolean;
  inventory: IInventory,
}

export interface IUsers {
  [key: string]: IUser;
}

export type ItemType = 'weapon' | 'usable' | 'wearable' | 'junk' | 'ammo' | 'note' | 'key' | 'misc';

export interface IItem {
  id: string;
  name: string;
  weight: number;
  time: number;
  effect: string;
  image: string;
  description: string;
  price: number;
  capacity: number;
  armor: number;
  amount?: number;
  approved: boolean;
  author?: string;
  type: ItemType;
  failed?: boolean;
}

export const defaultItem: IItem = {
  id: '',
  type: 'junk',
  name: '',
  effect: '',
  image: '',
  weight: 0,
  price: 0,
  description: '',
  capacity: 0,
  approved: false,
  armor: 0,
  time: 0,
  amount: 0,
};
