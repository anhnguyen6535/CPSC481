import { BillActionTypes, SplitBillActionTypes } from "../actionTypes";

export const orderBill = () => ({
  type: BillActionTypes.ORDER_BILL,
});

export const resetBill = () => ({
  type: BillActionTypes.RESET_BILL,
});

export const addDiner = (name: string) => ({
  type: SplitBillActionTypes.ADD_DINER,
  payload: name,
});

export const removeDiner = (name: string) => ({
  type: SplitBillActionTypes.REMOVE_DINER,
  payload: name,
});

export const selectPerson = (itemId: number, personName: string) => ({
  type: SplitBillActionTypes.SELECT_PERSON,
  payload: { itemId, personName },
});

export const deselectPerson = (itemId: number, personName: string) => ({
  type: SplitBillActionTypes.DESELECT_PERSON,
  payload: { itemId, personName },
});
