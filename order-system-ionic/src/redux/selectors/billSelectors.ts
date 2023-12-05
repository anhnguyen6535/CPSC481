import { RootState } from "../store";

export const selectIsBillOrdered = (state: RootState) =>
  state.bill.billOrdered;
