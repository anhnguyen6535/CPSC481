import { RootState } from "../store";

export const selectIsBillOrdered = (state: RootState) => state.bill.billOrdered;
export const selectSplitBillDiners = (state: RootState) =>
  state.bill.splitBillDiners;
