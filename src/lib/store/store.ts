import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { todoSlice } from "../../services/todos/redux/todoSlice";

const reducers = {
    todos: todoSlice.reducer,
};

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
