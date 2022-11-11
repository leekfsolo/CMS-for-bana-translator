export interface ISidebarItem {
  label: string;
  src: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  subItems?: ISidebarItem[];
}

export interface ISidebarList {
  title: string;
  items: ISidebarItem[];
}
