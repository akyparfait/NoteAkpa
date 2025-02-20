import { useState, useEffect } from "react";
import "./App.css";
import { Todo } from "./Todo";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

type NoteItem = {
    id: number;
    text: string;
};

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [input, setInput] = useState("");
    const [noteInput, setNoteInput] = useState("");

    useEffect(() => {
        // Carregar tarefas do localStorage ao iniciar
        try {
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                setTodos(JSON.parse(savedTodos));
            }
        } catch (error) {
            console.error("Erro ao carregar tarefas do localStorage", error);
        }

        // Carregar notas do servidor
        fetch("http://localhost:5000/notes")
            .then((res) => res.json())
            .then((data) => setNotes(data))
            .catch((err) => console.error("Erro ao carregar notas:", err));
    }, []);

    const addTodo = (text: string) => {
        if (!text.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text,
            completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInput("");
    };

    const addNote = (text: string) => {
        if (!text.trim()) return;

        fetch("http://localhost:5000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((newNote) => setNotes((prevNotes) => [...prevNotes, newNote]))
            .catch((err) => console.error("Erro ao adicionar nota:", err));

        setNoteInput("");
    };
    

    const removeNote = (id: number) => {
        fetch(`http://localhost:5000/notes/${id}`, {
            method: "DELETE",
        })
            .then(() => setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)))
            .catch((err) => console.error("Erro ao excluir nota:", err));
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
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        toggleTodo={() => {}}
                        removeTodo={() => {}}
                    />
                ))}
            </ul>

            <h2>Notas</h2>
            <div>
                <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Digite uma nota"
                />
                <button onClick={() => addNote(noteInput)}>Adicionar Nota</button>
            </div>

            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.text}{" "}
                        <button onClick={() => removeNote(note.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
