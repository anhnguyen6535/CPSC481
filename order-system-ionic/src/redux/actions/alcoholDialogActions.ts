import { AlcoholDialogActionTypes } from "../actionTypes";

export const openAlcoholDialog = () => ({
  type: AlcoholDialogActionTypes.OPEN_DIALOG,
});

export const closeAlcoholDialog = () => ({
  type: AlcoholDialogActionTypes.CLOSE_DIALOG,
});
