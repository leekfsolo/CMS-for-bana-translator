export type BaseProps = {
  children: React.ReactNode;
};

export type NonNullable<T> = Exclude<T, undefined | null>;

export type SelectDataType = {
  id: string;
  value: string;
};
