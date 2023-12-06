import { Reducer } from "redux";
import { AlcoholDialogActionTypes } from "../actionTypes";
import { PURGE } from "redux-persist";

interface AlcoholDialogState {
  isOpen: boolean;
  idVerified: boolean;
}

const initialState: AlcoholDialogState = {
  isOpen: false,
  idVerified: false,
};

export const alcoholDialogReducer: Reducer<AlcoholDialogState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AlcoholDialogActionTypes.OPEN_DIALOG: {
      return {
        ...state,
        isOpen: true,
      };
    }

    case AlcoholDialogActionTypes.CLOSE_DIALOG: {
      return {
        ...state,
        isOpen: false,
        idVerified: true, // add this to only get the dialog popup once per sitting
      };
    }

    case PURGE:
      return initialState;

    default:
      return state;
  }
};
