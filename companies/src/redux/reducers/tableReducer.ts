import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompamyInfo} from "../../types/types";
import {RootState} from "../store";

export interface ITableState {
    rows: ICompamyInfo[];
}

const initialState: ITableState = {
    rows: []
}

export const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        addNewRow(state, payload: PayloadAction<ICompamyInfo>) {
            state.rows.push(payload.payload);
        },
        removeRow(state, payload: PayloadAction<ICompamyInfo>) {
            state.rows = state.rows.filter(company => company.INN !== payload.payload.INN);
        },
        fillRow(state, payload: PayloadAction<ICompamyInfo>) {
            const index = state.rows.findIndex(company => company.INN === payload.payload.INN);
            state.rows[index] = payload.payload;
        },
        changeAddress(state, payload: PayloadAction<{newAddress: string, company: ICompamyInfo}>) {
            const index = state.rows.findIndex(company => company.INN === payload.payload.company.INN);
            state.rows[index].address = payload.payload.newAddress;
        }
    }
})

export const getCurrentRows = (state: RootState) => state.table.rows;