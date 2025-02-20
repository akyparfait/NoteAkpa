import { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./Todo";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState("");

    // Carregar tarefas do localStorage ao iniciar
    useEffect(() => {
        try {
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                setTodos(JSON.parse(savedTodos));
            }
        } catch (error) {
            console.error("Erro ao carregar tarefas do localStorage", error);
        }
    }, []);

    // Salvar tarefas no localStorage sempre que houver uma mudança
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = (text: string) => {
        if (!text.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text,
            completed: false,
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
        setInput("");
    };

    const toggleTodo = (id: number) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite uma tarefa"
                />
                <button onClick={() => addTodo(input)}>Adicionar</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <Todo 
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
