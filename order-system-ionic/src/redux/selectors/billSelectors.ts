import { CartItem } from "../../types";
import { RootState } from "../store";

export const selectIsBillOrdered = (state: RootState) => state.bill.billOrdered;
export const selectSplitBillDiners = (state: RootState) =>
  state.bill.splitBillDiners;

export const selectSplitBillItems = (state: RootState) =>
  state.bill.splitBillItems;

export const selectOrderByIndex = (state: RootState) =>
  state.bill.selectedItemsByIndex;

export const selectSplitBillOrders = (state: RootState) => {
  const { bill, order } = state;

  return bill.splitBillDiners.map((diner) => {
    const selectedItems = bill.selectedItemsByIndex[diner.index] || [];

    const personOrder = {
      personName: diner.name,
      selectedItems: selectedItems
        .map((selectedItem) => {
          const orders = order.orders.find((o) =>
            o.items.find(
              (cartItem: CartItem) => cartItem.item.id === selectedItem.itemId
            )
          );

          if (orders) {
            const selectedItemOrder = orders.items.find(
              (cartItem: CartItem) => cartItem.item.id === selectedItem.itemId
            );

            const totalForSelectedItem = selectedItemOrder
              ? (selectedItemOrder.quantity * selectedItemOrder.item.price) /
                selectedItem.selectedPeople.length
              : 0;

            return {
              item: selectedItemOrder ? selectedItemOrder.item : null,
              quantity: selectedItemOrder
                ? selectedItemOrder.quantity /
                  selectedItem.selectedPeople.length
                : 0,
              totalPrice: totalForSelectedItem,
            };
          }
          return null;
        })
        .filter((item) => item !== null),
    };

    return personOrder;
  });
};
