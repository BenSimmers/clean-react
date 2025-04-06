import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../models/types";
import { Status } from "../../../lib/constants/status";

export const fetchTodos = createAsyncThunk<Todo[], void>(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos",
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch todos: ${response.statusText}`,
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

type initialState = {
    todos: Todo[];
    status: Status;
    error: string | null;
};

const initialState: initialState = {
    todos: [],
    status: Status.IDLE,
    error: null,
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload,
            );
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.error = action.error.message || "Failed to fetch todos";
            });
    },
});
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
export const selectTodos = (state: { todos: initialState }) =>
    state.todos.todos;
export const selectTodoStatus = (state: { todos: initialState }) =>
    state.todos.status;
export const selectTodoError = (state: { todos: initialState }) =>
    state.todos.error;
