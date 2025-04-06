import { SmartTodos } from "../services/todos/components/SmartTodos";

const TodoPage: React.FC = () => {
    return (
        <div>
            <h1>Todo List</h1>
            <SmartTodos />
        </div>
    );
};


export default TodoPage;