import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import ProgressReducer from './ProgressSlice'
const store = configureStore({
  reducer: {
    form: formReducer,
    progress: ProgressReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
