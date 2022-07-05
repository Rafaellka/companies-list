import {configureStore} from '@reduxjs/toolkit';
import {tableSlice} from "./reducers/tableReducer";
import {dadataApi} from "../services/companyService";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        table: tableSlice.reducer,
        [dadataApi.reducerPath]:dadataApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dadataApi.middleware)
})