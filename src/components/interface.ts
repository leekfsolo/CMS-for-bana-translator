import {CardVariant} from './enum';

export interface ISidebarItem {
  label: string;
  src: string;
  icon?: React.ReactNode;
  subItems?: ISidebarItem[];
}

export interface ISidebarList {
  title: string;
  items: ISidebarItem[];
}

export interface IBasicCard {
  variant?: CardVariant;
  icon: React.ReactNode;
  title: string;
  content: string | number;
  prevIndex?: number;
  description: string;
}
