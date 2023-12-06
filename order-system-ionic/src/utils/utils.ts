import { CartItem } from "../types";

export const consolidateItems = (items: CartItem[]) => {
  const consolidatedItems = items.reduce(
    (acc: CartItem[], current: CartItem) => {
      const foundItem = acc.find((item) => item.item.id === current.item.id);
      if (foundItem) {
        foundItem.quantity += current.quantity;
      } else {
        acc.push({ ...current });
      }
      return acc;
    },
    [] as CartItem[]
  );

  return consolidatedItems;
};
