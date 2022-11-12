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
