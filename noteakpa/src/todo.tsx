import React from "react";

type TodoProps = {
    todo: {
        id: number;
        text: string;
        completed: boolean;
    };
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
};

export const Todo: React.FC<TodoProps> = ({ todo, toggleTodo, removeTodo }) => {
    return (
        <li className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "✅ " : "⬜ "} {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>❌</button>
        </li>
    );
};
