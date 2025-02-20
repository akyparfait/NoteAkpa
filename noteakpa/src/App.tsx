import { useState } from "react";
import "./App.css";

type TodoItem = {
    id: number;
    text: string;
    isCompleted: boolean;
};

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState("");

    // Função para adicionar tarefa
    const addTodo = (text: string) => {
        if (!text.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text,
            isCompleted: false,
        };

        setTodos([...todos, newTodo]);
        setInput(""); 
    };


    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite uma tarefa"
            />
            <button onClick={() => addTodo(input)}>Adicionar</button>

            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{ textDecoration: todo.isCompleted ? "line-through" : "none", cursor: "pointer" }}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
