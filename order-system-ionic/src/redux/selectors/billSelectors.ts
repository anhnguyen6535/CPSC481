import { PersonOrder } from "../reducers/billReducer";
import { RootState } from "../store";

export const selectIsBillOrdered = (state: RootState) => state.bill.billOrdered;
export const selectSplitBillDiners = (state: RootState) =>
  state.bill.splitBillDiners;

export const getItemsForPerson = (state: RootState, personName: string) => {
  const { bill } = state;
  const personOrder: PersonOrder = {
    personName,
    selectedItems: [],
  };

  bill.splitBillItems.forEach((item) => {
    if (item.selectedPeople.includes(personName)) {
      personOrder.selectedItems.push(item);
    }
  });

  return personOrder;
};
