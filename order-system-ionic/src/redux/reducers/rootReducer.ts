import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { alcoholDialogReducer } from "./alcoholDialogReducer";
import { HomepageReducer } from "./homepageReducer";
import { OrderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  alcoholDilaog: alcoholDialogReducer,
  home: HomepageReducer,
  order: OrderReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
