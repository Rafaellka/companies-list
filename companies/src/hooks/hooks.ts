import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {bindActionCreators} from "@reduxjs/toolkit";
import {tableSlice} from "../redux/reducers/tableReducer";

const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppAction = () => {
    const dispatch = useAppDispatch();

    return bindActionCreators({
        ...tableSlice.actions
    }, dispatch);
}