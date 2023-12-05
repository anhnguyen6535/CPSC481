import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { alcoholDialogReducer } from "./alcoholDialogReducer";
import { HomepageReducer } from "./homepageReducer";
import { OrderReducer } from "./orderReducer";
import billReducer from "./billReducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  alcoholDilaog: alcoholDialogReducer,
  home: HomepageReducer,
  order: OrderReducer,
  bill: billReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
