import { RootState } from "../store";

export const selectIsAlcoholDialogOpen = (state: RootState) =>
  state.alcoholDilaog.isOpen;
export const selectIsIdVerified = (state: RootState) =>
  state.alcoholDilaog.idVerified;
