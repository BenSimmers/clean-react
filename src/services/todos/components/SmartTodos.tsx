import { JSX } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "./Todo";
import { useTranslation } from "react-i18next";
import React from "react";

export const SmartTodos: React.FC = () => {
    const { todos, toggleTodo } = useTodos();
    const { t } = useTranslation();

    return todos.map(
        (todo): JSX.Element => (
            <React.Fragment key={todo.id}>
                <h1 style={{ outline: "1px solid red" }}>{t("todos.title")}</h1>
                <Todo key={todo.id} {...todo} toggleTodo={toggleTodo} />
            </React.Fragment>
        ),
    );
};
