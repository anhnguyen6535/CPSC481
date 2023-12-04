import { Reducer } from "redux";
import { BillActionTypes } from "../actionTypes";

interface BillState {
    billOrdered: boolean;
}

const initialState : BillState = {
    billOrdered: false,
};
  
  const billReducer: Reducer<BillState> = (state = initialState, action) => {
    switch (action.type) {
      case BillActionTypes.ORDER_BILL:
        return {
          ...state,
          billOrdered: true,
        };

      case BillActionTypes.RESET_BILL:
        return {
          ...state,
          billOrdered: false,
        };
        
      default:
        return state;
    }
  };
  
  export default billReducer;
  