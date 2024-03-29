import { IRoll } from '../helpers/dice';
import { ICharacter } from '../containers/Character/config';

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
  pinned?: boolean;
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
  error?: Error;
  notify?: string;
  redirect?: string;
  deletingItemData: IDeletedItemData;
  unreadMessage: boolean;
  characters: ICharacters,
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

export interface IPerk {
  id: number;
  label: string;
  description: string;
}

export type TStatus = 'online' | 'offline' | 'afk';
export interface IUser {
  nickname: string;
  avatar: string;
  theme: 'blue' | 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'purple' | 'magenta';

  aiApiKey?: string;
  uid: string,
  lastOnline: number;
  status: TStatus;
  isAdmin: boolean;
  approved: boolean;
  isSuperAdmin: boolean;
  notesAreVisible: boolean;
  zoom: number;
  enableDisabledFeatures: boolean;
  notificationVolume: number;
  isTyping?: boolean;
  error?: {
    message: string,
    code: string,
  }
}

export interface IUsers {
  [key: string]: IUser;
}

export interface ICharacters {
  [key: string]: ICharacter;
}

export const defaultUser: IUser = {
  lastOnline: 0,

  nickname: '',
  avatar: '',
  theme: 'blue',
  zoom: 100,
  enableDisabledFeatures: false,
  notificationVolume: 50,

  approved: false,
  uid: '',
  isAdmin: false,
  notesAreVisible: false,
  isSuperAdmin: false,
  status: 'online',
  aiApiKey: '',
  isTyping: false,
};

export type ItemType = 'weapon' | 'usable' | 'wearable' | 'junk' | 'ammo' | 'note' | 'key' | 'misc';

export interface IItem {
  discriminator: 'IItem',
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
  discriminator: 'IItem',
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

export interface IDeletedItemData {
  itemId?: string;
  deleted?: boolean;
  messagesChecked?: number;
  messagesCleared?: number;
  usersChecked?: number;
  usersCleared?: number;
  done?: boolean;
}

export const defaultDeletedItemData: IDeletedItemData = {
  itemId: '',
  deleted: false,
  messagesChecked: 0,
  messagesCleared: 0,
  usersChecked: 0,
  usersCleared: 0,
  done: false,
};
