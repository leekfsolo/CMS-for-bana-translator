export const getRoundedFloat = (value?: string, decimalPoint: number = 2): string | null =>
  value ? parseFloat(value).toFixed(decimalPoint) : null;
