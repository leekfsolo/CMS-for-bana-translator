export interface StaffData {
  version: string;
  createdDate: string;
  region: string;
  quantity: number;
}

export interface StaffHeadCell {
  disablePadding: boolean;
  id: keyof StaffData;
  label: string;
}
