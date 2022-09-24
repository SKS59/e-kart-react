import { createStore } from "redux";
import RootReducer from "../reducer/RootReducer";
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig={
  key:'root',
  version:1,
  storage
};
const persistedReducer=persistReducer(persistConfig,RootReducer)
const Store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default Store;