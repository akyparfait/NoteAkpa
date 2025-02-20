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
            <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                    cursor: "pointer",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#aaa" : "#333",
                }}
            >
                {todo.completed ? "✅ " : "⬜ "} {todo.text}
            </span>
            <button
                onClick={() => removeTodo(todo.id)}
                style={{
                    background: "none",
                    border: "none",
                    color: "#f44336",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                ❌
            </button>
        </li>
    );
};
