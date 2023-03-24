export const formatQuantity = (quantity: number) => {
  return quantity >= 10 ? quantity : quantity === 0 ? 0 : `0${quantity}`;
};
