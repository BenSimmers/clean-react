import React from "react";
import { Todo as TodoType } from "../models/types";

export type TodoProps = TodoType & { toggleTodo: (id: string) => void };

export const Todo: React.FC<TodoProps> = ({ id, title, completed, toggleTodo }) => {
    return (
        <div key={id} style={{ padding: "10px", margin: "10px", borderRadius: "5px" }}>
            <h3>{title}</h3>
            <p>{completed ? "Completed" : "Not Completed"}</p>
            <button onClick={() => toggleTodo(id)}>
                Toggle
            </button>

        </div>
    );
};
