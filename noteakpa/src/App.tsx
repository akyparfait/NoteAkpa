import { useState } from "react";
import "./App.css";
import { Todo } from './Todo'; // Importando o componente Todo

type TodoItem = {
    id: number;
    text: string;
    completed: boolean; // Usando 'completed'
};

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState("");

    const addTodo = (text: string) => {
        if (!text.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text,
            completed: false, // Usando 'completed'
        };

        setTodos([...todos, newTodo]);
        setInput(""); 
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo // Usando 'completed'
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
                    <Todo 
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;