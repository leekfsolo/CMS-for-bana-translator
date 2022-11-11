export interface StaffData {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface StaffHeadCell {
  disablePadding: boolean;
  id: keyof StaffData;
  label: string;
  numeric: boolean;
}
