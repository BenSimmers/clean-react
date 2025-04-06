import { JSX } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "./Todo";

export const SmartTodos: React.FC = () => {
    const { todos, toggleTodo } = useTodos();

    console.log("SmartTodos", todos);

    return todos.map(
        (todo): JSX.Element => (
            <Todo key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ),
    );
};
