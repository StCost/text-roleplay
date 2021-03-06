import { IInventory, IPerk } from '../../reducers/interfaces';

export interface IField {
  label: string;
  full: string;
  field: string;
  formula?: string;
  getBase?: (specials: { [key: string]: number }, stats: IStats) => number;

}

export interface IStats {
  level: number;
  hpPerLevel: number;
  exp: number;
  carryWeight: number;
  wounds: string;

  healthPoints: number;
  maxHealthPoints: number;
  armorClass: ICharacteristic;
  healingRate: number;
  resistance: number;
  actionPoints: number;
  sequence: number;
  meleeDamage: number;
  criticalChance: number;
  skillPoints: number;
  spentSkillPoints: number;
}

export interface ICharacteristic {
  change: number;
  base: number;
  total: number;
}

export type TLimb = 'crippled' | 'fine';

export interface ILimbs {
  handR: TLimb;
  handL: TLimb;
  legR: TLimb;
  legL: TLimb;
  head: TLimb;
  torso: TLimb;
}

export type TGifts = string[];

export interface ICharacter {
  uid: string;
  special: {
    strength: ICharacteristic;
    perception: ICharacteristic;
    endurance: ICharacteristic;
    charisma: ICharacteristic;
    intelligence: ICharacteristic;
    agility: ICharacteristic;
    luck: ICharacteristic;
  };
  skills: {
    smallGuns: ICharacteristic;
    bigGuns: ICharacteristic;
    energyGuns: ICharacteristic;
    unarmed: ICharacteristic;
    meleeWeapons: ICharacteristic;
    medicine: ICharacteristic;
    sneak: ICharacteristic;
    lockpick: ICharacteristic;
    steal: ICharacteristic;
    traps: ICharacteristic;
    science: ICharacteristic;
    repair: ICharacteristic;
    speech: ICharacteristic;
    barter: ICharacteristic;
    survival: ICharacteristic;
  };
  gifts: TGifts;
  limbs: ILimbs;
  stats: IStats;
  bio: string;
  inventory: IInventory,
  perks: IPerk[],
  static?: boolean;
  notes: string;
}

export const initialCharacteristic = {
  change: 0,
  base: 0,
  total: 0,
};


export const defaultLimbs: ILimbs = {
  handR: 'fine',
  head: 'fine',
  handL: 'fine',
  torso: 'fine',
  legR: 'fine',
  legL: 'fine',
};
export const getInitialCharacter: (() => ICharacter) = () => ({
  uid: '',
  special: {
    strength: initialCharacteristic,
    perception: initialCharacteristic,
    endurance: initialCharacteristic,
    charisma: initialCharacteristic,
    intelligence: initialCharacteristic,
    agility: initialCharacteristic,
    luck: initialCharacteristic,
  },
  skills: {
    smallGuns: initialCharacteristic,
    bigGuns: initialCharacteristic,
    energyGuns: initialCharacteristic,
    unarmed: initialCharacteristic,
    meleeWeapons: initialCharacteristic,
    medicine: initialCharacteristic,
    sneak: initialCharacteristic,
    lockpick: initialCharacteristic,
    steal: initialCharacteristic,
    traps: initialCharacteristic,
    science: initialCharacteristic,
    repair: initialCharacteristic,
    speech: initialCharacteristic,
    barter: initialCharacteristic,
    survival: initialCharacteristic,
  },
  stats: {
    level: 0,
    hpPerLevel: 0,
    exp: 0,
    carryWeight: 0,
    wounds: '',

    maxHealthPoints: 0,
    healthPoints: 0,
    armorClass: initialCharacteristic,
    healingRate: 0,
    resistance: 0,
    actionPoints: 0,
    sequence: 0,
    meleeDamage: 0,
    criticalChance: 0,
    skillPoints: 0,
    spentSkillPoints: 0,
  },
  gifts: [],
  limbs: defaultLimbs,
  bio: '',
  inventory: {},
  perks: [],
  notes: '',
});

export const special: IField[] = [
  {
    label: 'ST',
    full: 'Сила',
    field: 'strength',
  },
  {
    label: 'PE',
    full: 'Восприятие',
    field: 'perception',
  },
  {
    label: 'EN',
    full: 'Выносливость',
    field: 'endurance',
  },
  {
    label: 'CH',
    full: 'Харизма',
    field: 'charisma',
  },
  {
    label: 'IN',
    full: 'Интеллект',
    field: 'intelligence',
  },
  {
    label: 'AG',
    full: 'Ловкость',
    field: 'agility',
  },
  {
    label: 'LK',
    full: 'Удача',
    field: 'luck',
  },
];

export const skills: IField[] = [
  {
    label: 'Small Guns',
    full: 'Оружие',
    formula: '5+(4*AG)',
    field: 'smallGuns',
    getBase: (s) => 5 + (4 * s.ag),
  },
  {
    label: 'Big Guns',
    full: 'Большое оружие',
    formula: '(2*AG)',
    field: 'bigGuns',
    getBase: (s) => (2 * s.ag),
  },
  {
    label: 'Energy Guns',
    full: 'Энергетическое оружие',
    formula: '(2*AG)',
    field: 'energyGuns',
    getBase: (s) => (2 * s.ag),
  },
  {
    label: 'Unarmed',
    full: 'Без оружия',
    formula: '(30+(2*(AG+ST)))',
    field: 'unarmed',
    getBase: (s) => 30 + (2 * (s.ag + s.st)),
  },
  {
    label: 'Melee',
    full: 'Холодное оружие',
    formula: '20+(2*(AG+ST))',
    field: 'meleeWeapons',
    getBase: (s) => 20 + (2 * (s.ag + s.st)),
  },
  {
    label: 'Medicine',
    full: 'Медицина',
    formula: '5+(PE+EN+(3*AG))',
    field: 'medicine',
    getBase: (s) => 5 + (s.pe + s.en + (3 * s.ag)),
  },
  {
    label: 'Sneak',
    full: 'Скрытность',
    formula: '5+(3*AG)',
    field: 'sneak',
    getBase: (s) => 5 + (3 * s.ag),
  },
  {
    label: 'Lockpick',
    full: 'Взлом',
    formula: '10+(PE+AG)',
    field: 'lockpick',
    getBase: (s) => 10 + (s.pe + s.ag),
  },
  {
    label: 'Steal',
    full: 'Кража',
    formula: '(3+AG)',
    field: 'steal',
    getBase: (s) => 3 + s.ag,
  },
  {
    label: 'Traps',
    full: 'Ловушки',
    formula: '10+(PE+AG)',
    field: 'traps',
    getBase: (s) => 10 + (s.pe + s.ag),
  },
  {
    label: 'Science',
    full: 'Наука',
    formula: '(4*IN)',
    field: 'science',
    getBase: (s) => 4 * s.in,
  },
  {
    label: 'Repair',
    full: 'Ремонт',
    formula: '(3*IN)',
    field: 'repair',
    getBase: (s) => 3 * s.in,
  },
  {
    label: 'Speech',
    full: 'Красноречие',
    formula: '(5*CH)',
    field: 'speech',
    getBase: (s) => 5 * s.ch,
  },
  {
    label: 'Barter',
    full: 'Бартер',
    formula: '(4*CH)',
    field: 'barter',
    getBase: (s) => 4 * s.ch,
  },
  {
    label: 'Survival',
    full: 'Выживание',
    formula: '(2*(EN+IN))',
    field: 'survival',
    getBase: (s) => 2 * (s.en + s.in),
  },
];

export const stats: IField[] = [
  {
    label: 'Level',
    full: 'Уровень',
    field: 'level',
    getBase: (_, stats) => (Math.sqrt(((stats.exp / 500) * 4) + 1) + 1) / 2,
  },
  {
    label: 'HP/Level',
    full: 'ОЗ/Уровень',
    field: 'hpPerLevel',
    getBase: (s) => 3 + Math.floor(s.en / 2),
  },
  {
    label: 'Experience',
    full: 'Опыт',
    field: 'exp',
  },
  {
    label: 'Next Level',
    full: 'Следующий уровень',
    field: 'nextLevel',
    getBase: (_, stats) => {
      const lvl = stats.level + 1;
      return (lvl*(lvl-1)/2) * 1000
    }
  },
  // {
  //   label: 'Carry Weight',
  //   full: 'Переносимый вес',
  //   field: 'carryWeight',
  //   getBase: (s) => 25 + (25 * s.st),
  // },
  // {
  //   label: 'Wounds',
  //   full: 'Раны',
  //   field: 'wounds',
  // },
];

export const subStats: IField[] = [
  {
    label: 'Max HP',
    full: 'Макс. Очки Здоровья (ОЗ)',
    field: 'maxHealthPoints',
    getBase: (s, stats) => (15 + (s.st + (2 * s.en))) + (stats.hpPerLevel * stats.level),
  },
  {
    label: 'Health Points',
    full: 'Очки Здоровья (ОЗ)',
    field: 'healthPoints',
  },
  {
    label: 'КБ',
    full: 'Класс Брони',
    field: 'armorClass',
    getBase: (s) => s.ag,
  },
  {
    label: 'СЛ',
    full: 'СамоЛечение',
    field: 'healingRate',
    getBase: (s) => Math.floor(s.en / 3),
  },
  {
    label: 'СП',
    full: 'СоПротивление',
    field: 'resistance',
    getBase: (s) => 5 * s.en,
  },
  {
    label: 'ОД',
    full: 'Очки Действий',
    field: 'actionPoints',
    getBase: (s) => 5 + Math.ceil(s.ag / 2),
  },
  {
    label: 'ИЦ',
    full: 'ИниЦиатива',
    field: 'sequence',
    getBase: (s) => 2 * s.pe,
  },
  {
    label: 'РУ',
    full: 'Рукопашный Урон',
    field: 'meleeDamage',
    getBase: (s) => Math.max(1, s.st - 5),
  },
  {
    label: 'ШК',
    full: 'Шанс Крита',
    field: 'criticalChance',
    getBase: (s) => s.lk,
  },
  {
    label: 'ОН',
    full: 'Очки Навыков',
    field: 'skillPoints',
    getBase: (s, stats) => Math.floor((stats.level - 1) * (10 + (s.in / 2)) - stats.spentSkillPoints),
  },
];

export interface ICharacterChanges {
  label: string;
  full: string;
  before: number | string | ICharacteristic;
  after: number | string | ICharacteristic;
}

export const limb: IField[] = [
  {
    label: 'Head',
    field: 'head',
    full: 'Голова',
  },
  {
    label: 'Left Hand',
    field: 'handL',
    full: 'Лева рука',
  },
  {
    label: 'Right Hand',
    field: 'handR',
    full: 'Правая рука',
  },
  {
    label: 'Torso',
    field: 'torso',
    full: 'Торс',
  },
  {
    label: 'Left Leg',
    field: 'legL',
    full: 'Левая нога',
  },
  {
    label: 'Right Leg',
    field: 'legR',
    full: 'Правая нога',
  },
];

export const getConfigByField = (findField: string): IField | undefined => {
  return [...special, ...skills, ...stats, ...subStats, ...limb].find(({ field }) => field === findField);
};

