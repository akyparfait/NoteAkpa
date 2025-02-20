import React from 'react';
import { TodoItem as TodoItemType } from './types'

type Props = {
    todo: TodoItemType;
    toggleTodo: (id: number) => void;
};

export const Todo: React.FC<Props> = ({ todo, toggleTodo }) => {
    return (
        <li 
            onClick={() => toggleTodo(todo.id)} 
            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
        >
            {todo.text}
        </li>
    );
};
