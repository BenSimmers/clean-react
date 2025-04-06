import React from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks/hooks";
import { fetchTodos, selectTodoError, selectTodos, selectTodoStatus, toggleTodo } from "../redux/todoSlice";
import { Todo } from "../models/types";
import { Status } from "../../../lib/constants/status";

type useTodosReturnType = {
    todos: Todo[];
    status: Status;
    error: string | null;
    toggleTodo: (id: string) => void;
};


export const useTodos = (): useTodosReturnType => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);
    const status = useAppSelector(selectTodoStatus);
    const error = useAppSelector(selectTodoError);

    const toggleTodoCallback = React.useCallback((id: string) => {
        dispatch(toggleTodo(id));
    }, [dispatch]);

    React.useEffect(() => {
        if (status === Status.IDLE) {
            dispatch(fetchTodos());
        }
    }, [status, dispatch]);

    return {
        todos,
        status,
        error,
        toggleTodo: toggleTodoCallback,
    };
}

