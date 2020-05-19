import { IRoll } from "../helpers/dice";

export interface IAction {
  type: string;

  [key: string]: any; // Payload could be any type or size
}

export interface IMessage {
  author: string;
  time: number;
  body: string;
  // Remove header and top margin of message, because author is the same
  grouped?: boolean;
  isCommand?: boolean;
  isRP?: boolean;
  commandResult?: string;
  mentioned?: boolean;
  rolls?: IRoll[];
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
}

export interface IUser {
  nickname: string;
  avatar: string;
  uid: string,
  lastOnline: number;
  isAdmin?: boolean;
}

export interface IUsers {
  [key: string]: IUser;
}

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
  amount: number;
  approved: boolean;
  author?: string;
  type: 'weapon' | 'consumable' | 'wearable' | 'junk' | 'ammo' | 'note' | 'key' | 'misc',
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
